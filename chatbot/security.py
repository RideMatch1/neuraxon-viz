import os
import time
from collections import defaultdict
from functools import wraps
from flask import request, jsonify
import re
import html

class ChatbotSecurity:
    def __init__(self):
        self.rate_limits = defaultdict(list)
        self.blocked_ips = set()
        self.daily_costs = defaultdict(float)
        self.max_questions_per_minute = int(os.getenv('CHATBOT_MAX_QUESTIONS_PER_MINUTE', '5'))
        self.max_questions_per_hour = int(os.getenv('CHATBOT_MAX_QUESTIONS_PER_HOUR', '20'))
        self.max_questions_per_day = int(os.getenv('CHATBOT_MAX_QUESTIONS_PER_DAY', '100'))
        self.max_cost_per_day = float(os.getenv('CHATBOT_MAX_COST_PER_DAY', '0.10'))
        self.max_cost_per_month = float(os.getenv('CHATBOT_MAX_COST_PER_MONTH', '2.0'))
        self.max_tokens_per_request = int(os.getenv('CHATBOT_MAX_TOKENS_PER_REQUEST', '3000'))
    
    def get_client_ip(self):
        if request.headers.get('X-Forwarded-For'):
            return request.headers.get('X-Forwarded-For').split(',')[0].strip()
        return request.remote_addr
    
    def is_blocked(self, ip):
        return ip in self.blocked_ips
    
    def block_ip(self, ip):
        self.blocked_ips.add(ip)
    
    def check_rate_limit(self, ip):
        if self.is_blocked(ip):
            return False, "IP address blocked due to abuse"
        
        now = time.time()
        self.rate_limits[ip] = [t for t in self.rate_limits[ip] if now - t < 86400]
        
        recent_minute = [t for t in self.rate_limits[ip] if now - t < 60]
        recent_hour = [t for t in self.rate_limits[ip] if now - t < 3600]
        recent_day = len(self.rate_limits[ip])
        
        if len(recent_minute) >= self.max_questions_per_minute:
            return False, f"Rate limit exceeded: {self.max_questions_per_minute} questions per minute"
        
        if len(recent_hour) >= self.max_questions_per_hour:
            return False, f"Rate limit exceeded: {self.max_questions_per_hour} questions per hour"
        
        if recent_day >= self.max_questions_per_day:
            return False, f"Rate limit exceeded: {self.max_questions_per_day} questions per day"
        
        self.rate_limits[ip].append(now)
        return True, None
    
    def sanitize_input(self, text):
        if not text or not isinstance(text, str):
            return ""
        
        # Allow longer questions for more complex queries
        if len(text) > 500:
            text = text[:500]
        
        dangerous_patterns = [
            r'\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b',
            r'\b(rm\s+-rf|cat\s+/etc|wget|curl\s+http)',
            r'\.\.\/|\.\.\\\\',
            r'\$\{[^}]+\}|`[^`]+`',
            r'(ignore|forget|system|assistant|user|previous|above|below)',
            r'(repeat|echo|copy|duplicate)',
            r'(token|cost|limit|budget|spend)',
        ]
        
        prompt_injection_patterns = [
            r'you are now|act as|pretend to be|roleplay',
            r'ignore all|forget everything|disregard',
            r'system:|assistant:|user:',
            r'\[INST\]|\[/INST\]|<\|im_start\|>|<\|im_end\|>',
        ]
        
        for pattern in dangerous_patterns + prompt_injection_patterns:
            try:
                if re.search(pattern, text, re.IGNORECASE):
                    return ""
            except re.error:
                continue
        
        return html.escape(text.strip())
    
    def sanitize_response(self, text):
        if not text:
            return ""
        
        # Remove common LLM artifacts but keep the content
        llm_artifacts = [
            r"^let me\s+",
            r"^here's\s+",
            r"^note that\s+",
            r"\bi'll\s+",
            r"\bi can\s+",
        ]
        
        for pattern in llm_artifacts:
            text = re.sub(pattern, '', text, flags=re.IGNORECASE)
        
        # Ensure response ends with proper punctuation
        text = text.strip()
        if text and not text[-1] in '.!?':
            # Find last sentence boundary
            last_period = text.rfind('.')
            last_exclamation = text.rfind('!')
            last_question = text.rfind('?')
            last_punct = max(last_period, last_exclamation, last_question)
            
            if last_punct > len(text) * 0.8:  # If punctuation is in last 20% of text
                text = text[:last_punct + 1]
            else:
                text = text + '.'
        
        # Clean up multiple spaces but preserve paragraph structure
        text = re.sub(r'[ \t]+', ' ', text)
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)  # Max 2 newlines
        
        return text.strip()
    
    def check_cost_limit(self, ip, cost):
        today = time.strftime('%Y-%m-%d')
        self.daily_costs[today] += cost
        
        if self.daily_costs[today] > self.max_cost_per_day:
            self.block_ip(ip)
            return False, "Daily cost limit exceeded"
        
        if cost > 0.01:
            self.block_ip(ip)
            return False, "Request cost too high"
        
        return True, None
    
    def check_token_limit(self, tokens):
        if tokens > self.max_tokens_per_request:
            return False, f"Token limit exceeded: {tokens} > {self.max_tokens_per_request}"
        return True, None
    
    def rate_limit_decorator(self, f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            security = ChatbotSecurity()
            ip = security.get_client_ip()
            
            if security.is_blocked(ip):
                return jsonify({'error': 'Access denied'}), 403
            
            allowed, error_msg = security.check_rate_limit(ip)
            if not allowed:
                return jsonify({'error': error_msg}), 429
            
            return f(*args, **kwargs)
        return decorated_function

