# Troubleshooting

## HTTP 403 Error

If you get "HTTP ERROR 403", try:

1. **Kill all processes on port 5000:**
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. **Start server manually:**
   ```bash
   cd qubic-anna-lab-public/web
   python3 app.py
   ```

3. **Use 127.0.0.1 instead of localhost:**
   - http://127.0.0.1:5000

4. **Check if another server is running:**
   ```bash
   lsof -i:5000
   ```

5. **Clear browser cache** and try again

## Server Status

Check if server is running:
```bash
curl http://127.0.0.1:5000/
```

Should return HTML, not error.

## Common Issues

- **Port already in use:** Kill process on port 5000
- **Template errors:** Check Flask console output
- **Missing data:** Visualization needs neuraxon export file
- **403 Error:** Usually means wrong server or browser cache

## Quick Fix

```bash
cd qubic-anna-lab-public/web
./START_SERVER.sh
```

Then open: http://127.0.0.1:5000

