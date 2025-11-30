from pathlib import Path
from typing import List, Dict
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import numpy as np

load_dotenv()

class CodeRetriever:
    def __init__(self, db_path: Path = None):
        try:
            import faiss
            self.faiss_available = True
        except ImportError:
            raise ValueError("FAISS not available. Chatbot requires faiss-cpu package. Install with: pip install faiss-cpu")
        
        self.db_path = db_path or (Path(__file__).parent.parent / 'faiss_db')
        self.db_path.mkdir(exist_ok=True)
        
        self.index_file = self.db_path / 'index.faiss'
        self.metadata_file = self.db_path / 'metadata.json'
        
        if not self.index_file.exists() or not self.metadata_file.exists():
            raise ValueError("Database not indexed. Run: python chatbot/index_codebase.py")
        
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        
        self.openai_client = OpenAI(api_key=api_key)
        
        # Load FAISS index
        self.index = faiss.read_index(str(self.index_file))
        
        # Load metadata
        with open(self.metadata_file, 'r') as f:
            self.metadata = json.load(f)
    
    def retrieve(self, query: str, n_results: int = 5) -> List[Dict]:
        # Get query embedding
        query_embedding = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=[query]
        ).data[0].embedding
        
        # Convert to numpy array
        query_vector = np.array([query_embedding], dtype='float32')
        
        # Search in FAISS index
        distances, indices = self.index.search(query_vector, n_results)
        
        retrieved = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.metadata):
                doc = self.metadata[idx]
                retrieved.append({
                    'id': doc.get('id', str(idx)),
                    'text': doc.get('text', ''),
                    'metadata': doc.get('metadata', {}),
                    'distance': float(distances[0][i]) if distances is not None else None
                })
        
        return retrieved
