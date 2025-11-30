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
        
        # FAISS index and metadata
        self.index = None
        self.metadata = []
        self.embedding_dim = 1536  # text-embedding-3-small dimension
    
    def extract_code_info(self, file_path: Path) -> List[Dict]:
        # Copy the extract_code_info method from the original indexer
        # This is a simplified version - you may need to copy the full implementation
        if not file_path.exists():
            return []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
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
            return [chunk]
        except Exception:
            return []
    
    def index_repository(self):
        # Import the original indexer to reuse its extraction logic
        from chatbot.indexer import CodeIndexer as OriginalIndexer
        
        original = OriginalIndexer(self.repo_path, self.db_path)
        all_chunks = []
        
        # Use original indexer's file scanning logic
        python_files = list(self.repo_path.rglob('*.py'))
        md_files = list(self.repo_path.rglob('*.md'))
        
        excluded_dirs = {'faiss_db', 'chroma_db', '__pycache__', '.git', 'node_modules', 'venv', 'env', '.venv', 'static/vendor', 'static/images', 'static/fonts'}
        
        for py_file in python_files:
            if any(excluded in str(py_file) for excluded in excluded_dirs):
                continue
            chunks = original.extract_code_info(py_file)
            all_chunks.extend(chunks)
        
        for md_file in md_files:
            if any(excluded in str(md_file) for excluded in excluded_dirs):
                continue
            chunks = original.extract_code_info(md_file)
            all_chunks.extend(chunks)
        
        if not all_chunks:
            return 0
        
        # Generate embeddings
        texts = [chunk['text'] for chunk in all_chunks]
        ids = [f"{chunk['file']}:{chunk['type']}:{chunk['name']}" for chunk in all_chunks]
        metadatas = [{'file': chunk['file'], 'type': chunk['type'], 'name': chunk['name']} for chunk in all_chunks]
        
        print("Generating embeddings...")
        embeddings = []
        batch_size = 50
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i+batch_size]
            response = self.openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=batch
            )
            batch_embeddings = [item.embedding for item in response.data]
            embeddings.extend(batch_embeddings)
            print(f"Processed {min(i+batch_size, len(texts))}/{len(texts)} chunks")
        
        # Create FAISS index
        embeddings_array = np.array(embeddings, dtype='float32')
        self.index = faiss.IndexFlatL2(self.embedding_dim)
        self.index.add(embeddings_array)
        
        # Save index
        index_file = self.db_path / 'index.faiss'
        faiss.write_index(self.index, str(index_file))
        
        # Save metadata
        metadata_data = []
        for i, (doc_id, text, metadata) in enumerate(zip(ids, texts, metadatas)):
            metadata_data.append({
                'id': doc_id,
                'text': text,
                'metadata': metadata
            })
        
        metadata_file = self.db_path / 'metadata.json'
        with open(metadata_file, 'w') as f:
            json.dump(metadata_data, f)
        
        return len(ids)
