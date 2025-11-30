#!/usr/bin/env python3

import sys
import os
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
load_dotenv()

from chatbot.indexer import CodeIndexer

BASE_DIR = Path(__file__).parent.parent
# Only index neuraxon-viz directory, not the entire parent repo
REPO_DIR = BASE_DIR

if __name__ == '__main__':
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set in .env file")
        sys.exit(1)
    
    print("Indexing codebase...")
    print(f"Repository: {REPO_DIR}")
    print("This may take a few minutes...")
    
    try:
        indexer = CodeIndexer(REPO_DIR)
        count = indexer.index_repository()
        print(f"\nIndexed {count} code chunks successfully.")
        print("Chatbot is ready to use.")
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

