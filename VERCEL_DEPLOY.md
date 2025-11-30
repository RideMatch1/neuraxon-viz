# Vercel Deployment Guide

## Environment Variables Setup

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add these variables:**

```
OPENAI_API_KEY=sk-...
FLASK_SECRET_KEY=your-secret-key-here
CHATBOT_MAX_QUESTIONS_PER_MINUTE=5
CHATBOT_MAX_QUESTIONS_PER_HOUR=20
CHATBOT_MAX_QUESTIONS_PER_DAY=100
CHATBOT_MAX_COST_PER_DAY=0.10
CHATBOT_MAX_COST_PER_MONTH=2.0
CHATBOT_MAX_TOKENS_PER_REQUEST=3000
```

## Deployment Steps

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd web
   vercel
   ```

4. **For production:**
   ```bash
   vercel --prod
   ```

## Important Notes

- **Never commit API keys** - They are only in Vercel Environment Variables
- The `.env` file is in `.gitignore` and `.vercelignore`
- All API keys are loaded from environment variables only
- Rate limits are strict: 5/min, 20/hour, 100/day
- Cost limits: $0.10/day, $2.0/month max

## Post-Deployment

1. **Index the codebase** (one-time, run locally or via Vercel CLI):
   ```bash
   vercel env pull .env.local
   python3 chatbot/index_codebase.py
   ```

2. **Upload chroma_db** to Vercel (or use Vercel's storage)

## Security Checklist

- ✅ No API keys in code
- ✅ All keys in environment variables
- ✅ Rate limiting enabled
- ✅ Cost limits enabled
- ✅ Token limits enabled
- ✅ Input sanitization
- ✅ Prompt injection protection
- ✅ IP blocking for abuse

