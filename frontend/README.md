# RAG Chatbot Frontend

React + Vite + TypeScript + Tailwind UI that consumes a decoupled **RAG Pipeline Service API** (FastAPI backend). The backend is treated purely as a stateless pipeline service: the UI sends documents and questions, while the service orchestrates ingestion (load → split → embed → persist), retrieval (vector similarity), and answer generation through an LLM. This separation allows you to swap or scale the pipeline independently (horizontal API scaling, multi-tenant routing, or plugging in alternative embedding / chat providers) without touching the UI code.

## Features
- Upload PDF documents to the backend ingestion endpoint
- Ask questions about ingested documents (semantic retrieval & answer)
- Shows answer sources and vector hit scores
- Dark / Light theme toggle
- Recent questions sidebar

## RAG Pipeline Service API Integration
The frontend talks to a single base URL (`VITE_API_URL`) and relies on the following contract:

| Stage | Endpoint | Method | Purpose |
|-------|----------|--------|---------|
| Ingest Upload | `/ingest/upload` | POST (multipart) | Accept a PDF file; server loads & appends to vector store |
| Health / Stats | `/health` | GET | Lightweight readiness + vector count (no heavy embedding) |
| Answer (Question → Response) | `/answer` | POST (JSON) | Perform retrieval + LLM synthesis with default k/threshold |
| Advanced Query (Optional) | `/query` | POST (JSON) | Custom k/threshold/source filtering |

### Pipeline Flow (Conceptual)
```
User Action (Upload PDF)
	-> UI POST /ingest/upload
		-> Backend: Load PDF -> Split -> Embed -> Upsert vectors (Chroma)

User Action (Ask Question)
	-> UI POST /answer { question }
		-> Backend: Build DB handle -> Similarity search -> (optional source filter) -> Prompt assembly -> LLM answer -> Return { response, sources, hits }

UI Render Cycle
	-> Display answer markdown + source badges
	-> Maintain transient in-memory history (Zustand) – no PII persisted client-side by default
```

### Why This Matters / Impact
| Aspect | Impact |
|--------|--------|
| Decoupling | UI deploys independently; backend can be scaled / versioned (v1 → v2) without UI rebuild (only env change). |
| Security | No backend URL hardcoded; private deployment hidden via `.env`. |
| Extensibility | Swap embedding/chat provider or add reranking layer in backend pipeline transparently to UI. |
| Performance | Frontend remains lightweight; heavy CPU/GPU operations isolated in API tier. |
| Multi-Tenancy (Future) | UI could send tenant headers / API keys; pipeline routes to separate vector stores. |

### Extending the Pipeline (Ideas)
- Add `/rerank` step or incorporate a reranker before answering.
- Add streaming endpoint `/answer/stream` for token streaming.
- Introduce doc management endpoints (`/documents`, `/documents/:id/delete`).
- Add auth (JWT / API key header) without any UI structural change.

> The current UI assumes synchronous responses. If you later add streaming, you can adapt with an EventSource or fetch reader while keeping the same high-level store pattern.

## Quick Start

```bash
npm install
npm run dev
```

Set backend URL (never hardcode it): create `.env` with:

```
VITE_API_URL=http://localhost:8000
```
For a deployed/private backend (e.g. Render) set `VITE_API_URL=https://your-service.onrender.com` locally but **do not commit the real URL if you want to keep it private**—commit only an `.env.example` without secrets.

Type definitions for `import.meta.env` live in `src/env.d.ts`.

## Build

```bash
npm run build
```

## Deployment Notes
- Served as static assets (dist/) behind any web server
- Configure reverse proxy so frontend `/api` maps to backend root if you adjust proxy logic

## License
See repository root.
