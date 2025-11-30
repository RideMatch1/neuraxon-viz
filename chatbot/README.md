# Chatbot Module

Repository assistant chatbot using RAG (Retrieval-Augmented Generation) with OpenAI GPT-4o mini.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set API key in `.env`:**
   ```bash
   OPENAI_API_KEY=your-key-here
   ```

3. **Index codebase (one-time):**
   ```bash
   python chatbot/index_codebase.py
   ```

4. **Start server:**
   ```bash
   python app.py
   ```

## Updating the Index

To update the index with new code:

```python
from chatbot.indexer import CodeIndexer
from pathlib import Path

indexer = CodeIndexer(Path('/path/to/repo'))
indexer.index_repository()
```

Or update a single file:

```python
indexer.update_index(Path('/path/to/file.py'))
```

## Security Features

- Rate limiting: 10/min, 50/hour, 1000/day per IP
- Input sanitization: Max 500 chars, SQL/command injection protection
- Response filtering: Removes LLM artifacts
- Cost monitoring: Auto-disable if limits exceeded
- IP blocking: Automatic blocking for abuse

## Configuration

Edit `.env`:

```
CHATBOT_MAX_QUESTIONS_PER_MINUTE=10
CHATBOT_MAX_QUESTIONS_PER_HOUR=50
CHATBOT_MAX_QUESTIONS_PER_DAY=1000
CHATBOT_MAX_COST_PER_DAY=1.0
CHATBOT_MAX_COST_PER_MONTH=10.0
```

## Cost Estimate

- Per question: ~$0.0002
- 1000 questions/month: ~$0.21
- Very affordable with GPT-4o mini

