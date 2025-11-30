"""
Path Sanitizer for Chatbot Sources
Ensures all file paths are valid, exist, and point to correct GitHub URLs
"""

import os
from pathlib import Path
from typing import List, Dict, Optional

# GitHub repository base URL
GITHUB_REPO = "https://github.com/RideMatch1/qubic-anna-lab-public"
GITHUB_BRANCH = "main"

class PathSanitizer:
    def __init__(self, repo_root: Path = None):
        """
        Initialize path sanitizer with repository root.
        Auto-detects qubic-anna-lab-public repository if not provided.
        
        Args:
            repo_root: Path to repository root (qubic-anna-lab-public), optional
        """
        if repo_root is None:
            # Auto-detect repository
            current = Path(__file__).resolve()
            # Try to find qubic-anna-lab-public from neuraxon-viz
            if 'neuraxon-viz' in str(current):
                # We're in neuraxon-viz, go up to find qubic-anna-lab-public
                potential_root = current.parent.parent / 'qubic-anna-lab-public'
                if potential_root.exists():
                    repo_root = potential_root
                else:
                    # Fallback: use current directory
                    repo_root = current.parent.parent
            else:
                repo_root = current.parent.parent
        
        self.repo_root = Path(repo_root).resolve()
        self.web_root = self.repo_root / 'web'
        
        # Cache for existing files
        self._file_cache = {}
        self._build_file_cache()
    
    def _build_file_cache(self):
        """Build cache of all existing files in repository."""
        if not self.repo_root.exists():
            return
        
        for root, dirs, files in os.walk(self.repo_root):
            # Skip hidden directories and common ignore patterns
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['__pycache__', 'node_modules', 'chroma_db', 'vector_db', 'faiss_db']]
            
            for file in files:
                if file.startswith('.'):
                    continue
                
                file_path = Path(root) / file
                try:
                    rel_path = file_path.relative_to(self.repo_root)
                    self._file_cache[str(rel_path)] = file_path
                    # Also cache without 'web/' prefix for backward compatibility
                    if str(rel_path).startswith('web/'):
                        alt_path = str(rel_path)[4:]
                        self._file_cache[alt_path] = file_path
                except ValueError:
                    continue
    
    def sanitize_path(self, file_path: str) -> Optional[str]:
        """
        Sanitize and validate a file path.
        
        Args:
            file_path: Path string from metadata (e.g., 'templates/index.html' or 'web/templates/index.html')
        
        Returns:
            Valid GitHub URL if file exists, None otherwise
        """
        if not file_path or file_path == 'unknown':
            return None
        
        # Normalize path
        file_path = file_path.strip().strip('/')
        
        # Try different path variations - prioritize web/ prefix since that's where files actually are
        possible_paths = [
            f"web/{file_path}",  # With web/ prefix (most likely)
            file_path.replace('templates/', 'web/templates/'),  # Fix templates/ paths
            file_path,  # Original
            file_path.replace('web/templates/', 'templates/'),  # Remove web/ if present (fallback)
        ]
        
        # Remove duplicates while preserving order
        seen = set()
        unique_paths = []
        for p in possible_paths:
            if p not in seen:
                seen.add(p)
                unique_paths.append(p)
        possible_paths = unique_paths
        
        # Check if any variation exists
        valid_path = None
        for path_variant in possible_paths:
            # Check cache first
            if path_variant in self._file_cache:
                valid_path = path_variant
                break
            
            # Check filesystem
            full_path = self.repo_root / path_variant
            if full_path.exists() and full_path.is_file():
                valid_path = path_variant
                self._file_cache[path_variant] = full_path
                break
        
        if not valid_path:
            return None
        
        # Convert to GitHub URL
        github_url = f"{GITHUB_REPO}/blob/{GITHUB_BRANCH}/{valid_path}"
        return github_url
    
    def sanitize_sources(self, sources: List[Dict]) -> List[Dict]:
        """
        Sanitize a list of source metadata dictionaries.
        
        Args:
            sources: List of source metadata dicts with 'file' key
        
        Returns:
            List of sanitized sources with valid GitHub URLs
        """
        sanitized = []
        seen_urls = set()
        
        for source in sources:
            file_path = source.get('file', '')
            github_url = self.sanitize_path(file_path)
            
            if github_url and github_url not in seen_urls:
                sanitized.append({
                    'file': file_path,  # Keep original for reference
                    'url': github_url,  # Valid GitHub URL
                    'name': Path(file_path).name,  # Just filename
                    'type': source.get('type', 'file'),
                })
                seen_urls.add(github_url)
        
        return sanitized

