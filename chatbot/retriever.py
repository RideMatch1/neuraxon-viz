from pathlib import Path
from typing import List, Dict
import chromadb
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

class CodeRetriever:
    def __init__(self, db_path: Path = None):
        self.db_path = db_path or (Path(__file__).parent.parent / 'chroma_db')
        
        if not self.db_path.exists():
            raise ValueError("Database not indexed. Run: python chatbot/index_codebase.py")
        
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        
        self.openai_client = OpenAI(api_key=api_key)
        
        import chromadb
        from chromadb.config import Settings
        
        self.client = chromadb.PersistentClient(
            path=str(self.db_path),
            settings=Settings(anonymized_telemetry=False)
        )
        
        self.collection = self.client.get_collection("codebase")
    
    def retrieve(self, query: str, n_results: int = 5) -> List[Dict]:
        query_embedding = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=[query]
        ).data[0].embedding
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        retrieved = []
        if results['ids'] and len(results['ids'][0]) > 0:
            for i, doc_id in enumerate(results['ids'][0]):
                retrieved.append({
                    'id': doc_id,
                    'text': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i],
                    'distance': results['distances'][0][i] if 'distances' in results else None
                })
        
        return retrieved

