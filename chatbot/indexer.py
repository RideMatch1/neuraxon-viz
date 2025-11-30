import os
import ast
from pathlib import Path
from typing import List, Dict, Optional
import faiss
import numpy as np
import json
from openai import OpenAI
from dotenv import load_dotenv
import tiktoken

load_dotenv()

class CodeIndexer:
    def __init__(self, repo_path: Path, db_path: Path = None):
        self.repo_path = repo_path
        self.db_path = db_path or (Path(__file__).parent.parent / 'faiss_db')
        self.db_path.mkdir(exist_ok=True)
        
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        
        self.openai_client = OpenAI(api_key=api_key)
        self.encoding = tiktoken.encoding_for_model("gpt-4o-mini")
        self.embedding_dim = 1536  # text-embedding-3-small dimension
        
        # FAISS index (will be created during indexing)
        self.index = None
        self.metadata = []
    
    def extract_code_info(self, file_path: Path) -> List[Dict]:
        if not file_path.exists():
            return []
        
        if file_path.suffix == '.md':
            return self.extract_markdown_info(file_path)
        
        if file_path.suffix == '.html':
            return self.extract_html_info(file_path)
        
        if file_path.suffix == '.js':
            return self.extract_javascript_info(file_path)
        
        if file_path.suffix == '.css':
            return self.extract_css_info(file_path)
        
        if file_path.suffix == '.json':
            return self.extract_json_info(file_path)
        
        if file_path.suffix != '.py':
            return []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            tree = ast.parse(content)
            chunks = []
            
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    docstring = ast.get_docstring(node) or ""
                    code_snippet = ast.get_source_segment(content, node) or ""
                    
                    file_rel = str(file_path.relative_to(self.repo_path))
                    if file_rel.startswith('web/'):
                        file_rel = file_rel[4:]
                    
                    chunk = {
                        'file': file_rel,
                        'type': 'function',
                        'name': node.name,
                        'code': code_snippet[:1000],
                        'docstring': docstring,
                        'text': f"Function {node.name} in {file_path.name}:\n{docstring}\n\nCode:\n{code_snippet[:500]}"
                    }
                    chunks.append(chunk)
                
                elif isinstance(node, ast.ClassDef):
                    docstring = ast.get_docstring(node) or ""
                    code_snippet = ast.get_source_segment(content, node) or ""
                    
                    file_rel = str(file_path.relative_to(self.repo_path))
                    if file_rel.startswith('web/'):
                        file_rel = file_rel[4:]
                    
                    chunk = {
                        'file': file_rel,
                        'type': 'class',
                        'name': node.name,
                        'code': code_snippet[:1000],
                        'docstring': docstring,
                        'text': f"Class {node.name} in {file_path.name}:\n{docstring}\n\nCode:\n{code_snippet[:500]}"
                    }
                    chunks.append(chunk)
            
            if not chunks:
                file_rel = str(file_path.relative_to(self.repo_path))
                if file_rel.startswith('web/'):
                    file_rel = file_rel[4:]
                
                chunk = {
                    'file': file_rel,
                    'type': 'file',
                    'name': file_path.name,
                    'code': content[:1000],
                    'docstring': '',
                    'text': f"File {file_path.name}:\n{content[:500]}"
                }
                chunks.append(chunk)
            
            return chunks
        
        except Exception:
            return []
    
    def extract_markdown_info(self, file_path: Path) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) < 50:
                return []
            
            file_rel = str(file_path.relative_to(self.repo_path))
            if file_rel.startswith('web/'):
                file_rel = file_rel[4:]
            
            max_chunk_size = 1500
            chunks = []
            
            if len(content) <= max_chunk_size:
                chunk = {
                    'file': file_rel,
                    'type': 'documentation',
                    'name': file_path.stem,
                    'code': content,
                    'docstring': '',
                    'text': f"Documentation file {file_path.name}:\n\n{content}"
                }
                chunks.append(chunk)
            else:
                parts = content.split('\n\n')
                current_chunk = ""
                chunk_num = 0
                
                for part in parts:
                    if len(current_chunk) + len(part) > max_chunk_size and current_chunk:
                        chunk = {
                            'file': file_rel,
                            'type': 'documentation',
                            'name': f"{file_path.stem}_part{chunk_num}",
                            'code': current_chunk,
                            'docstring': '',
                            'text': f"Documentation file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                        }
                        chunks.append(chunk)
                        current_chunk = part
                        chunk_num += 1
                    else:
                        current_chunk += "\n\n" + part if current_chunk else part
                
                if current_chunk:
                    file_rel = str(file_path.relative_to(self.repo_path))
                    if file_rel.startswith('web/'):
                        file_rel = file_rel[4:]
                    
                    chunk = {
                        'file': file_rel,
                        'type': 'documentation',
                        'name': f"{file_path.stem}_part{chunk_num}",
                        'code': current_chunk,
                        'docstring': '',
                        'text': f"Documentation file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def extract_html_info(self, file_path: Path) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) < 50:
                return []
            
            file_rel = str(file_path.relative_to(self.repo_path))
            if file_rel.startswith('web/'):
                file_rel = file_rel[4:]
            
            max_chunk_size = 1500
            chunks = []
            
            if len(content) <= max_chunk_size:
                chunk = {
                    'file': file_rel,
                    'type': 'html_template',
                    'name': file_path.stem,
                    'code': content,
                    'docstring': '',
                    'text': f"HTML template {file_path.name}:\n\n{content}"
                }
                chunks.append(chunk)
            else:
                parts = content.split('\n\n')
                current_chunk = ""
                chunk_num = 0
                
                for part in parts:
                    if len(current_chunk) + len(part) > max_chunk_size and current_chunk:
                        chunk = {
                            'file': file_rel,
                            'type': 'html_template',
                            'name': f"{file_path.stem}_part{chunk_num}",
                            'code': current_chunk,
                            'docstring': '',
                            'text': f"HTML template {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                        }
                        chunks.append(chunk)
                        current_chunk = part
                        chunk_num += 1
                    else:
                        current_chunk += "\n\n" + part if current_chunk else part
                
                if current_chunk:
                    chunk = {
                        'file': file_rel,
                        'type': 'html_template',
                        'name': f"{file_path.stem}_part{chunk_num}",
                        'code': current_chunk,
                        'docstring': '',
                        'text': f"HTML template {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def extract_javascript_info(self, file_path: Path) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) < 50:
                return []
            
            file_rel = str(file_path.relative_to(self.repo_path))
            if file_rel.startswith('web/'):
                file_rel = file_rel[4:]
            
            max_chunk_size = 1500
            chunks = []
            
            if file_path.name == 'popups.js':
                return self.extract_popups_js_info(file_path, file_rel)
            
            if len(content) <= max_chunk_size:
                chunk = {
                    'file': file_rel,
                    'type': 'javascript',
                    'name': file_path.stem,
                    'code': content,
                    'docstring': '',
                    'text': f"JavaScript file {file_path.name}:\n\n{content}"
                }
                chunks.append(chunk)
            else:
                parts = content.split('\n\n')
                current_chunk = ""
                chunk_num = 0
                
                for part in parts:
                    if len(current_chunk) + len(part) > max_chunk_size and current_chunk:
                        chunk = {
                            'file': file_rel,
                            'type': 'javascript',
                            'name': f"{file_path.stem}_part{chunk_num}",
                            'code': current_chunk,
                            'docstring': '',
                            'text': f"JavaScript file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                        }
                        chunks.append(chunk)
                        current_chunk = part
                        chunk_num += 1
                    else:
                        current_chunk += "\n\n" + part if current_chunk else part
                
                if current_chunk:
                    chunk = {
                        'file': file_rel,
                        'type': 'javascript',
                        'name': f"{file_path.stem}_part{chunk_num}",
                        'code': current_chunk,
                        'docstring': '',
                        'text': f"JavaScript file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def extract_popups_js_info(self, file_path: Path, file_rel: str) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            chunks = []
            import re
            
            popup_pattern = r"'([^']+)':\s*\{[^}]*title:\s*'([^']+)',[^}]*content:\s*`([^`]+)`"
            matches = list(re.finditer(popup_pattern, content, re.DOTALL))
            
            seen_ids = set()
            for match in matches:
                popup_id = match.group(1)
                if popup_id in seen_ids:
                    continue
                seen_ids.add(popup_id)
                
                popup_title = match.group(2)
                popup_content = match.group(3)
                
                max_content_len = 1000
                if len(popup_content) > max_content_len:
                    popup_content = popup_content[:max_content_len] + "..."
                
                chunk = {
                    'file': file_rel,
                    'type': 'javascript',
                    'name': f"popup_{popup_id}",
                    'code': popup_content[:500],
                    'docstring': popup_title,
                    'text': f"Popup: {popup_id}\nTitle: {popup_title}\n\n{popup_content}"
                }
                chunks.append(chunk)
            
            if not chunks:
                max_chunk_size = 1000
                parts = content.split("'")
                current_chunk = ""
                chunk_num = 0
                
                for i, part in enumerate(parts):
                    if len(current_chunk) + len(part) > max_chunk_size and current_chunk:
                        chunk = {
                            'file': file_rel,
                            'type': 'javascript',
                            'name': f"{file_path.stem}_part{chunk_num}",
                            'code': current_chunk,
                            'docstring': '',
                            'text': f"JavaScript file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                        }
                        chunks.append(chunk)
                        current_chunk = part
                        chunk_num += 1
                    else:
                        current_chunk += "'" + part if current_chunk else part
                
                if current_chunk:
                    chunk = {
                        'file': file_rel,
                        'type': 'javascript',
                        'name': f"{file_path.stem}_part{chunk_num}",
                        'code': current_chunk,
                        'docstring': '',
                        'text': f"JavaScript file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def extract_css_info(self, file_path: Path) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) < 50:
                return []
            
            file_rel = str(file_path.relative_to(self.repo_path))
            if file_rel.startswith('web/'):
                file_rel = file_rel[4:]
            
            max_chunk_size = 1500
            chunks = []
            
            if len(content) <= max_chunk_size:
                chunk = {
                    'file': file_rel,
                    'type': 'css',
                    'name': file_path.stem,
                    'code': content,
                    'docstring': '',
                    'text': f"CSS file {file_path.name}:\n\n{content}"
                }
                chunks.append(chunk)
            else:
                parts = content.split('\n\n')
                current_chunk = ""
                chunk_num = 0
                
                for part in parts:
                    if len(current_chunk) + len(part) > max_chunk_size and current_chunk:
                        chunk = {
                            'file': file_rel,
                            'type': 'css',
                            'name': f"{file_path.stem}_part{chunk_num}",
                            'code': current_chunk,
                            'docstring': '',
                            'text': f"CSS file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                        }
                        chunks.append(chunk)
                        current_chunk = part
                        chunk_num += 1
                    else:
                        current_chunk += "\n\n" + part if current_chunk else part
                
                if current_chunk:
                    chunk = {
                        'file': file_rel,
                        'type': 'css',
                        'name': f"{file_path.stem}_part{chunk_num}",
                        'code': current_chunk,
                        'docstring': '',
                        'text': f"CSS file {file_path.name} (part {chunk_num + 1}):\n\n{current_chunk}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def extract_json_info(self, file_path: Path) -> List[Dict]:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) < 50:
                return []
            
            file_rel = str(file_path.relative_to(self.repo_path))
            if file_rel.startswith('web/'):
                file_rel = file_rel[4:]
            
            max_chunk_size = 1500
            chunks = []
            
            if len(content) <= max_chunk_size:
                chunk = {
                    'file': file_rel,
                    'type': 'json_data',
                    'name': file_path.stem,
                    'code': content,
                    'docstring': '',
                    'text': f"JSON data file {file_path.name}:\n\n{content}"
                }
                chunks.append(chunk)
            else:
                import json
                try:
                    data = json.loads(content)
                    if isinstance(data, dict):
                        for key, value in list(data.items())[:20]:
                            chunk = {
                                'file': file_rel,
                                'type': 'json_data',
                                'name': f"{file_path.stem}_{key}",
                                'code': json.dumps({key: value}, indent=2),
                                'docstring': '',
                                'text': f"JSON data file {file_path.name}, key '{key}':\n\n{json.dumps({key: value}, indent=2)}"
                            }
                            chunks.append(chunk)
                    else:
                        chunk = {
                            'file': file_rel,
                            'type': 'json_data',
                            'name': file_path.stem,
                            'code': content[:max_chunk_size],
                            'docstring': '',
                            'text': f"JSON data file {file_path.name}:\n\n{content[:max_chunk_size]}"
                        }
                        chunks.append(chunk)
                except:
                    chunk = {
                        'file': file_rel,
                        'type': 'json_data',
                        'name': file_path.stem,
                        'code': content[:max_chunk_size],
                        'docstring': '',
                        'text': f"JSON data file {file_path.name}:\n\n{content[:max_chunk_size]}"
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception:
            return []
    
    def index_repository(self):
        python_files = list(self.repo_path.rglob('*.py'))
        md_files = list(self.repo_path.rglob('*.md'))
        txt_files = list(self.repo_path.rglob('*.txt'))
        html_files = list(self.repo_path.rglob('*.html'))
        js_files = list(self.repo_path.rglob('*.js'))
        css_files = list(self.repo_path.rglob('*.css'))
        json_files = list(self.repo_path.rglob('*.json'))
        all_chunks = []
        
        excluded_dirs = {'faiss_db', 'chroma_db', '__pycache__', '.git', 'node_modules', 'venv', 'env', '.venv', 'static/vendor', 'static/images', 'static/fonts', 'repos', 'outputs', 'data/neuraxon_exports'}
        excluded_files = {'.gitignore', 'FETCH_HEAD', 'requirements.txt', 'package-lock.json', 'package.json'}
        excluded_patterns = ['_PLAN.md', '_ANALYSIS.md', 'TROUBLESHOOTING.md', 'TESTING.md', 'SECURITY_WARNING.md', 'VERCEL_DEPLOY.md']
        
        print(f"Found {len(python_files)} Python files, {len(md_files)} Markdown files, {len(txt_files)} text files")
        print(f"Found {len(html_files)} HTML files, {len(js_files)} JavaScript files, {len(css_files)} CSS files, {len(json_files)} JSON files")
        
        for py_file in python_files:
            if any(excluded in str(py_file) for excluded in excluded_dirs):
                continue
            if py_file.name in excluded_files:
                continue
            if any(pattern in py_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(py_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {py_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for md_file in md_files:
            if any(excluded in str(md_file) for excluded in excluded_dirs):
                continue
            if md_file.name in excluded_files:
                continue
            if any(pattern in md_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(md_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {md_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for txt_file in txt_files:
            if any(excluded in str(txt_file) for excluded in excluded_dirs):
                continue
            if txt_file.name in excluded_files:
                continue
            if any(pattern in txt_file.name for pattern in excluded_patterns):
                continue
            
            if txt_file.name in ['README.txt', 'LICENSE.txt'] or 'README' in txt_file.name:
                chunks = self.extract_markdown_info(txt_file)
                all_chunks.extend(chunks)
                if chunks:
                    print(f"  Indexed: {txt_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for html_file in html_files:
            if any(excluded in str(html_file) for excluded in excluded_dirs):
                continue
            if html_file.name in excluded_files:
                continue
            if any(pattern in html_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(html_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {html_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for js_file in js_files:
            if any(excluded in str(js_file) for excluded in excluded_dirs):
                continue
            if js_file.name in excluded_files:
                continue
            if any(pattern in js_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(js_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {js_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for css_file in css_files:
            if any(excluded in str(css_file) for excluded in excluded_dirs):
                continue
            if css_file.name in excluded_files:
                continue
            if any(pattern in css_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(css_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {css_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        for json_file in json_files:
            if any(excluded in str(json_file) for excluded in excluded_dirs):
                continue
            if json_file.name in excluded_files:
                continue
            if any(pattern in json_file.name for pattern in excluded_patterns):
                continue
            
            chunks = self.extract_code_info(json_file)
            all_chunks.extend(chunks)
            if chunks:
                print(f"  Indexed: {json_file.relative_to(self.repo_path)} ({len(chunks)} chunks)")
        
        if not all_chunks:
            return
        
        ids = [f"{chunk['file']}:{chunk['type']}:{chunk['name']}" for chunk in all_chunks]
        texts = [chunk['text'] for chunk in all_chunks]
        metadatas = [
            {
                'file': chunk['file'],
                'type': chunk['type'],
                'name': chunk['name']
            }
            for chunk in all_chunks
        ]
        
        print("Generating embeddings...")
        embeddings = []
        ids_filtered = []
        texts_filtered = []
        metadatas_filtered = []
        
        max_tokens = 8000
        for i, text in enumerate(texts):
            tokens = len(self.encoding.encode(text))
            if tokens > max_tokens:
                print(f"  Warning: Skipping chunk {ids[i]} (too large: {tokens} tokens)")
                continue
            ids_filtered.append(ids[i])
            texts_filtered.append(text)
            metadatas_filtered.append(metadatas[i])
        
        if not texts_filtered:
            print("No valid chunks after filtering")
            return 0
        
        print(f"Filtered {len(texts) - len(texts_filtered)} chunks that were too large")
        print(f"Processing {len(texts_filtered)} chunks...")
        
        batch_size = 50
        for i in range(0, len(texts_filtered), batch_size):
            batch = texts_filtered[i:i+batch_size]
            try:
                response = self.openai_client.embeddings.create(
                    model="text-embedding-3-small",
                    input=batch
                )
                batch_embeddings = [item.embedding for item in response.data]
                embeddings.extend(batch_embeddings)
                print(f"Processed {min(i+batch_size, len(texts_filtered))}/{len(texts_filtered)} chunks")
            except Exception as e:
                print(f"Error processing batch {i//batch_size + 1}: {e}")
                if "maximum context length" in str(e).lower():
                    print("  Trying smaller batch size...")
                    for j in range(i, min(i+batch_size, len(texts_filtered))):
                        try:
                            single_response = self.openai_client.embeddings.create(
                                model="text-embedding-3-small",
                                input=[texts_filtered[j]]
                            )
                            embeddings.append(single_response.data[0].embedding)
                            print(f"  Processed single chunk {j+1}/{len(texts_filtered)}")
                        except Exception as e2:
                            print(f"  Skipping chunk {ids_filtered[j]} due to error: {e2}")
                            embeddings.append([0.0] * 1536)
                else:
                    raise
        
        # Create FAISS index
        if len(embeddings) != len(ids_filtered):
            print(f"Warning: Embedding count ({len(embeddings)}) doesn't match filtered IDs ({len(ids_filtered)})")
            min_len = min(len(embeddings), len(ids_filtered), len(texts_filtered), len(metadatas_filtered))
            embeddings = embeddings[:min_len]
            ids_filtered = ids_filtered[:min_len]
            texts_filtered = texts_filtered[:min_len]
            metadatas_filtered = metadatas_filtered[:min_len]
        
        # Convert embeddings to numpy array
        embeddings_array = np.array(embeddings, dtype='float32')
        
        # Create FAISS index
        self.index = faiss.IndexFlatL2(self.embedding_dim)
        self.index.add(embeddings_array)
        
        # Save FAISS index
        index_file = self.db_path / 'index.faiss'
        faiss.write_index(self.index, str(index_file))
        
        # Save metadata
        metadata_data = []
        for i, (doc_id, text, metadata) in enumerate(zip(ids_filtered, texts_filtered, metadatas_filtered)):
            metadata_data.append({
                'id': doc_id,
                'text': text,
                'metadata': metadata
            })
        
        metadata_file = self.db_path / 'metadata.json'
        with open(metadata_file, 'w') as f:
            json.dump(metadata_data, f)
        
        return len(ids_filtered)
    
    def update_index(self, file_path: Path):
        # For FAISS, we need to rebuild the entire index
        # This is a limitation of FAISS - it doesn't support incremental updates easily
        print("FAISS doesn't support incremental updates. Rebuilding full index...")
        return self.index_repository()

