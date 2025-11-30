import os
import requests
import time
from typing import List, Dict, Optional, Tuple
from collections import defaultdict
from dotenv import load_dotenv

load_dotenv()

class WebSearch:
    def __init__(self):
        self.rate_limits = defaultdict(list)
        self.max_searches_per_minute = int(os.getenv('WEB_SEARCH_MAX_PER_MINUTE', '5'))
        self.max_searches_per_hour = int(os.getenv('WEB_SEARCH_MAX_PER_HOUR', '20'))
        self.max_searches_per_day = int(os.getenv('WEB_SEARCH_MAX_PER_DAY', '100'))
        self.duckduckgo_api = os.getenv('DUCKDUCKGO_API_KEY', '')
    
    def check_rate_limit(self, ip: str) -> Tuple[bool, Optional[str]]:
        now = time.time()
        self.rate_limits[ip] = [t for t in self.rate_limits[ip] if now - t < 86400]
        
        recent_minute = [t for t in self.rate_limits[ip] if now - t < 60]
        recent_hour = [t for t in self.rate_limits[ip] if now - t < 3600]
        recent_day = len(self.rate_limits[ip])
        
        if len(recent_minute) >= self.max_searches_per_minute:
            return False, f"Web search rate limit exceeded: {self.max_searches_per_minute} searches per minute"
        
        if len(recent_hour) >= self.max_searches_per_hour:
            return False, f"Web search rate limit exceeded: {self.max_searches_per_hour} searches per hour"
        
        if recent_day >= self.max_searches_per_day:
            return False, f"Web search rate limit exceeded: {self.max_searches_per_day} searches per day"
        
        self.rate_limits[ip].append(now)
        return True, None
    
    def search(self, query: str, ip: str = 'unknown', max_results: int = 5) -> Dict:
        allowed, error_msg = self.check_rate_limit(ip)
        if not allowed:
            return {'error': error_msg, 'results': []}
        
        query = query.strip()[:200]
        if not query:
            return {'error': 'Empty query', 'results': []}
        
        try:
            url = "https://api.duckduckgo.com/"
            params = {
                'q': query,
                'format': 'json',
                'no_html': '1',
                'skip_disambig': '1'
            }
            
            response = requests.get(url, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            results = []
            if 'RelatedTopics' in data:
                for topic in data['RelatedTopics'][:max_results]:
                    if 'Text' in topic and 'FirstURL' in topic:
                        results.append({
                            'title': topic.get('Text', '')[:100],
                            'url': topic.get('FirstURL', ''),
                            'snippet': topic.get('Text', '')[:300]
                        })
            
            if 'AbstractText' in data and data['AbstractText']:
                results.insert(0, {
                    'title': data.get('Heading', query),
                    'url': data.get('AbstractURL', ''),
                    'snippet': data.get('AbstractText', '')[:300]
                })
            
            return {
                'query': query,
                'results': results[:max_results],
                'count': len(results)
            }
        
        except requests.exceptions.RequestException as e:
            return {'error': f'Search request failed: {str(e)}', 'results': []}
        except Exception as e:
            return {'error': f'Search error: {str(e)}', 'results': []}
    
    def format_results(self, search_result: Dict) -> str:
        if 'error' in search_result:
            return f"Web search unavailable: {search_result['error']}"
        
        if not search_result.get('results'):
            return "No web search results found."
        
        formatted = "Web search results:\n\n"
        for i, result in enumerate(search_result['results'], 1):
            formatted += f"{i}. {result.get('title', 'No title')}\n"
            formatted += f"   URL: {result.get('url', 'N/A')}\n"
            formatted += f"   {result.get('snippet', 'No snippet')}\n\n"
        
        return formatted

