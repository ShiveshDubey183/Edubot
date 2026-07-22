# EduBot — AI Student Support Chatbot

A Generative AI-powered chatbot that helps college students in India get instant answers about admissions, fees, exams, faculty, placements, hostel, and all college-related queries. Powered by Google Gemini.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/student-chatbot run dev` — run the frontend (port 23699, preview at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Required secret: `GEMINI_API_KEY` — Google Gemini API key

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4 + shadcn/ui
- API: Express 5 (artifacts/api-server)
- AI: Google Gemini 2.5 Flash via `@google/genai` SDK
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — DB schema (conversations.ts, messages.ts)
- `lib/integrations-gemini-ai/` — Gemini AI client wrapper
- `artifacts/api-server/src/routes/gemini/` — Chat API routes with SSE streaming
- `artifacts/student-chatbot/src/` — React frontend

## Architecture decisions

- SSE (Server-Sent Events) for real-time streaming AI responses — consumed with raw `fetch` + `ReadableStream` on the client since Orval can't generate typed SSE hooks
- Gemini system prompt tuned for Indian college context — fees, admissions, exams, placements, hostel, documents, Gen AI topics
- Conversations stored in PostgreSQL with full message history for multi-turn context
- `GEMINI_API_KEY` used directly with Google's official SDK (not Replit AI Integrations proxy)

## Product

- Single-page chat interface with sidebar listing conversation history
- Quick suggestion chips for common student queries
- Real-time streaming AI responses with typing indicator
- Conversation management (create, switch, delete)
- Bilingual support (Hindi/English/Hinglish)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, run `pnpm --filter @workspace/api-spec run codegen` before using updated types
- `@google/genai` is externalized by esbuild (via `@google/*` rule) so it must be a direct `dependencies` entry in api-server's package.json
- The image client (`lib/integrations-gemini-ai/src/image/client.ts`) also checks for `GEMINI_API_KEY` — both clients must use the same env var
