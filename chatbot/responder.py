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
        
        self.system_prompt = """You are a technical assistant for the Anna Matrix Lab repository. Provide concise, accurate answers based on the codebase context.

Guidelines:
- Keep answers SHORT and to the point (2-4 sentences maximum)
- Use the provided context from code files, documentation, and data
- Be precise, factual, and technically accurate
- If information is not in the context, say so briefly
- Avoid lengthy explanations or multiple paragraphs
- Always end with a complete sentence

Be concise and direct - users want quick answers, not essays."""

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
            # Keep context per item short (up to 300 chars)
            if len(text) > 300:
                text = text[:300] + "..."
            context_parts.append(f"File: {file_path}\n{text}\n---")
        
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
            for msg in conversation_history[-1:]:  # Only last 1 message
                msg_content = msg.get('content', '')
                # Keep history context short (up to 100 tokens per message)
                if self.estimate_tokens(msg_content) > 100:
                    msg_content = msg_content[:100] + "..."
                messages.append({"role": msg.get('role', 'user'), "content": msg_content})
        
        user_message = f"Context from codebase:\n{context}\n\nQuestion: {question}\n\nProvide a concise, direct answer (2-4 sentences max):"
        
        total_tokens = sum(self.estimate_tokens(m.get('content', '')) for m in messages) + self.estimate_tokens(user_message)
        if total_tokens > 4000:
            # If still too large, reduce context but keep question
            context = context[:1000] + "..."
            user_message = f"Context from codebase:\n{context}\n\nQuestion: {question}\n\nProvide a concise, direct answer (2-4 sentences max):"
        
        messages.append({"role": "user", "content": user_message})
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.2,
                max_tokens=500,
                stop=None
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

