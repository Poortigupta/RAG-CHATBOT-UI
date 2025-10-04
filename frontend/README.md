# RAG Chatbot Frontend

React + Vite + TypeScript + Tailwind UI for interacting with the FastAPI RAG backend.

## Features
- Upload PDF documents to the backend ingestion endpoint
- Ask questions about ingested documents (semantic retrieval & answer)
- Shows answer sources and vector hit scores
- Dark / Light theme toggle
- Recent questions sidebar

## Quick Start

```bash
npm install
npm run dev
```

Set backend URL (if not default): create `.env` with:

```
VITE_API_URL=http://localhost:8000
```

## Build

```bash
npm run build
```

## Deployment Notes
- Served as static assets (dist/) behind any web server
- Configure reverse proxy so frontend `/api` maps to backend root if you adjust proxy logic

## License
See repository root.
