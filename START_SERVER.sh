#!/bin/bash

cd "$(dirname "$0")"
lsof -ti:5000 | xargs kill -9 2>/dev/null
python3 app.py

