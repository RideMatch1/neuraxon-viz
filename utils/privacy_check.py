#!/usr/bin/env python3

import re
from pathlib import Path
from typing import List, Dict


def check_for_sensitive_data(content: str, file_path: Path) -> List[Dict[str, str]]:
    issues = []
    
    # Check for absolute paths
    absolute_path_pattern = r'/(Users|home|C:\\|/var|/tmp|/private)/[^\s"\'<>]+'
    if re.search(absolute_path_pattern, content):
        issues.append({
            'type': 'absolute_path',
            'severity': 'high',
            'message': 'Absolute path detected'
        })
    
    # Check for email addresses (personal)
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, content)
    # Filter out generic/example emails
    personal_emails = [e for e in emails if not any(x in e.lower() for x in ['example', 'test', 'noreply', 'admin'])]
    if personal_emails:
        issues.append({
            'type': 'personal_email',
            'severity': 'high',
            'message': f'Personal email detected: {personal_emails[0]}'
        })
    
    # Check for phone numbers
    phone_pattern = r'\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
    phones = re.findall(phone_pattern, content)
    if phones:
        issues.append({
            'type': 'phone_number',
            'severity': 'medium',
            'message': 'Phone number pattern detected'
        })
    
    # Check for API keys / tokens
    api_key_patterns = [
        r'[Aa][Pp][Ii][_\-]?[Kk][Ee][Yy][\s:=]+[\w\-]{20,}',
        r'[Ss][Ee][Cc][Rr][Ee][Tt][\s:=]+[\w\-]{20,}',
        r'[Tt][Oo][Kk][Ee][Nn][\s:=]+[\w\-]{20,}',
    ]
    for pattern in api_key_patterns:
        if re.search(pattern, content):
            issues.append({
                'type': 'api_key',
                'severity': 'critical',
                'message': 'Potential API key/token detected'
            })
            break
    
    return issues


def sanitize_for_public(content: str) -> str:
    # Replace absolute paths with placeholders
    content = re.sub(
        r'/(Users|home|C:\\|/var|/tmp|/private)/[^\s"\'<>]+',
        '[REDACTED_PATH]',
        content
    )
    
    # Replace personal emails with generic
    content = re.sub(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
        lambda m: 'contact@example.com' if not any(x in m.group().lower() for x in ['example', 'test', 'noreply']) else m.group(),
        content
    )
    
    return content

