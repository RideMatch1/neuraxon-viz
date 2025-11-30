#!/usr/bin/env python3

import re
from pathlib import Path
from typing import List, Dict


LLM_PHRASES = [
    r"Professional\s+\w+",
    r"100%\s+\w+",
    r"Built with",
    r"Let me\s+",
    r"Here's\s+",
    r"Note that\s+",
    r"It's important\s+",
    r"As you can see",
    r"To summarize",
    r"In summary",
    r"Ensures\s+",
    r"Returns\s+",
    r"Please note",
    r"Keep in mind",
    r"Make sure\s+",
    r"Don't forget",
    r"Remember to",
    r"Be sure\s+",
    r"Feel free",
    r"First and foremost",
    r"Last but not least",
    r"Needless to say",
    r"It goes without saying",
]


def check_llm_artifacts(content: str, file_path: Path) -> List[Dict[str, str]]:
    issues = []
    for pattern in LLM_PHRASES:
        matches = re.finditer(pattern, content, re.IGNORECASE)
        for match in matches:
            line_num = content[:match.start()].count('\n') + 1
            issues.append({
                'type': 'llm_phrase',
                'severity': 'medium',
                'message': f'LLM phrase: "{match.group()}"',
                'line': line_num,
                'file': str(file_path)
            })
    return issues


def check_file(file_path: Path) -> List[Dict[str, str]]:
    if not file_path.exists():
        return []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return check_llm_artifacts(content, file_path)
    except Exception:
        return []


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        file_path = Path(sys.argv[1])
        issues = check_file(file_path)
        if issues:
            print(f"Found {len(issues)} LLM artifact(s) in {file_path}:")
            for issue in issues:
                print(f"  Line {issue['line']}: {issue['message']}")
            sys.exit(1)
        else:
            print(f"No LLM artifacts found in {file_path}")
            sys.exit(0)

