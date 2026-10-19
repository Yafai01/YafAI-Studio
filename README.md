# YafAI Studio

YafAI Studio is a local AI code generator. You describe a task in plain English, and a small open-source code model, [DeepSeek Coder 1.3B Instruct](https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-instruct), writes the code for it. A FastAPI backend runs the model on the CPU with Hugging Face Transformers, and a Next.js frontend provides the prompt interface.

## Features

- **Prompt-to-code generation** with `deepseek-ai/deepseek-coder-1.3b-instruct`, running on the CPU with no GPU or paid API required
- **REST API**: a single `POST /generate` endpoint that takes a prompt and returns the generated code
- **Web UI**: a prompt box, a generated-code panel with one-click copy, and a dark/light theme toggle
- **Model pre-download script** that fetches the weights once before you start the server

## Tech stack

| Layer    | Technology |
|----------|------------|
| Model    | DeepSeek Coder 1.3B Instruct (Hugging Face Transformers, PyTorch) |
| Backend  | Python, FastAPI, Uvicorn |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, lucide-react |

## Getting started

### Prerequisites

- Python 3.9+
- Node.js 20+ and npm
- About 3 GB of free disk space for the model weights, plus enough RAM to run a 1.3B-parameter model in float32

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python download_model.py        # one-time download of the model weights
uvicorn app:app --reload        # serves on http://127.0.0.1:8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                     # http://localhost:3000
```

The UI sends requests to `http://127.0.0.1:8000/generate`, so start the backend first.

## API

`POST /generate`

```json
// request
{ "prompt": "Write a Python function that checks if a string is a palindrome" }

// response
{ "code": "..." }
```

Generation uses sampling (temperature 0.2, top-p 0.95) and stops after at most 128 new tokens. You can change these settings in `backend/model.py`.

## Project structure

```
backend/
  app.py               FastAPI app, CORS, /generate endpoint
  model.py             Model loading and generate_code()
  download_model.py    Pre-downloads the model and tokenizer
  requirements.txt
frontend/
  app/page.tsx         Main UI (prompt, output, theme toggle)
  app/layout.tsx       Root layout and metadata
  lib/api.ts           API helper (reads NEXT_PUBLIC_API_URL)
  package.json
```

## Notes

- CORS is open (`allow_origins=["*"]`) for local development. Restrict it before deploying.
- The backend URL is hardcoded in `app/page.tsx`. A helper in `lib/api.ts` reads `NEXT_PUBLIC_API_URL` instead, but the page does not use it yet.
