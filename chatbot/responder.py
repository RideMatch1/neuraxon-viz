import os
from pathlib import Path
from typing import List, Dict, Optional
from openai import OpenAI
from dotenv import load_dotenv
from .retriever import CodeRetriever
from .security import ChatbotSecurity
from .path_sanitizer import PathSanitizer
import tiktoken

load_dotenv()

class ChatbotResponder:
    def __init__(self, retriever: CodeRetriever, repo_root: Path = None):
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        
        self.client = OpenAI(api_key=api_key)
        self.retriever = retriever
        self.security = ChatbotSecurity()
        self.web_search = None
        self.encoding = tiktoken.encoding_for_model("gpt-4o-mini")
        
        # Initialize path sanitizer
        if repo_root is None:
            repo_root = Path(__file__).parent.parent.parent
        self.path_sanitizer = PathSanitizer(repo_root)
        
        self.system_prompt = """Technical assistant for Anna Matrix Lab repository. Answer concisely (max 2-3 sentences). Reference files when relevant. Be factual and neutral."""

    def estimate_tokens(self, text: str) -> int:
        return len(self.encoding.encode(text))
    
    def estimate_cost(self, input_tokens: int, output_tokens: int) -> float:
        input_cost = (input_tokens / 1_000_000) * 0.15
        output_cost = (output_tokens / 1_000_000) * 0.60
        return input_cost + output_cost
    
    def build_context(self, retrieved: List[Dict]) -> str:
        context_parts = []
        for item in retrieved:
            file_path = item['metadata'].get('file', 'unknown')
            text = item['text']
            if len(text) > 500:
                text = text[:500] + "..."
            context_parts.append(f"{file_path}: {text}")
        
        return "\n".join(context_parts)
    
    def generate_response(self, question: str, conversation_history: List[Dict] = None, client_ip: str = 'unknown') -> Dict:
        question = self.security.sanitize_input(question)
        if not question:
            return {'error': 'Invalid input'}
        
        estimated_tokens = self.estimate_tokens(question)
        if hasattr(self.security, 'check_token_limit'):
            token_check = self.security.check_token_limit(estimated_tokens)
            if not token_check[0]:
                return {'error': token_check[1]}
        
        retrieved = self.retriever.retrieve(question, n_results=3)
        context = self.build_context(retrieved)
        
        max_context_tokens = 2000
        context_tokens = self.estimate_tokens(context)
        if context_tokens > max_context_tokens:
            context = context[:int(len(context) * max_context_tokens / context_tokens)]
        
        messages = [{"role": "system", "content": self.system_prompt}]
        
        if conversation_history:
            for msg in conversation_history[-2:]:
                msg_content = msg.get('content', '')
                if self.estimate_tokens(msg_content) > 200:
                    msg_content = msg_content[:200] + "..."
                messages.append({"role": msg.get('role', 'user'), "content": msg_content})
        
        user_message = f"Context:\n{context}\n\nQ: {question}\nA:"
        
        total_tokens = sum(self.estimate_tokens(m.get('content', '')) for m in messages) + self.estimate_tokens(user_message)
        if total_tokens > 3000:
            user_message = f"Q: {question}\nA:"
        
        messages.append({"role": "user", "content": user_message})
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.1,
                max_tokens=150
            )
            
            answer = response.choices[0].message.content
            answer = self.security.sanitize_response(answer)
            
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            cost = self.estimate_cost(input_tokens, output_tokens)
            
            # Sanitize sources - only return valid, existing file paths
            raw_sources = [item['metadata'] for item in retrieved]
            sanitized_sources = self.path_sanitizer.sanitize_sources(raw_sources)
            
            return {
                'answer': answer,
                'sources': sanitized_sources,
                'tokens': {
                    'input': input_tokens,
                    'output': output_tokens,
                    'total': response.usage.total_tokens
                },
                'cost': cost
            }
        
        except Exception as e:
            return {'error': f'Error generating response: {str(e)}'}

