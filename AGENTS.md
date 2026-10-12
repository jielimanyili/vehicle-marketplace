# AGENTS.md

> Instructions for AI coding agents working in this repo.

## Project
A modernization demo: an existing vehicle-selling app re-architected onto Next.js (App Router) + AWS serverless (Lambda, API Gateway, DynamoDB, S3) with a Bedrock RAG assistant. Monorepo: `frontend/` (Next.js) and `backend/` (AWS SAM).

## Commands
- backend deploy: `cd backend && sam build && sam deploy --guided`
- backend test: `cd backend && <test cmd>`
- frontend install: `cd frontend && npm install`
- frontend dev/build: `cd frontend && npm run dev` / `npm run build`
- frontend lint: `cd frontend && npm run lint`

## Conventions
- TypeScript: prefer `interface` over `type` for object shapes; `readonly` by default.
- React: functional components + hooks only; no class components.
- Naming: components PascalCase, hooks `use*`, files kebab-case.
- Backend: one Lambda handler per file; keep handlers thin (orchestration only).
- Style is enforced by ESLint + Prettier; prose guide: `docs/style-guide.md`.

## Boundaries (non-negotiable)
- Never read or write `.env` or any secret (incl. AWS keys, Bedrock access).
- Don't add dependencies without asking.
- Don't change architecture — propose an ADR first (`docs/adr/`).
- Run tests + lint before finishing.

## Review gates
Every change must pass: architecture fit · correctness · security · test coverage · readability. See `docs/ai-assisted-development.md`.
