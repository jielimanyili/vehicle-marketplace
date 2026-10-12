# Vehicle Marketplace — Modernization Demo

A demo that re-architects a legacy **vehicle-selling application** onto a modern **serverless + Next.js** stack — the target state for a Karsun-style full-stack modernization.

> Built to match Karsun's required stack: React.js / Node.js, serverless AWS (Lambda, API Gateway, DynamoDB, S3, Kinesis), GraphQL/REST, MySQL (RDS/Aurora), and AI (Agentic + RAG via Bedrock).

## Why Next.js (not plain React)
The public storefront is SEO-critical — buyers find listings via search. Next.js App Router gives **SSR/SSG for crawlable, fast-first-paint listing pages**, with `"use client"` islands for interactive parts (filters, search). The internal tooling surface would stay a plain SPA. See `ARCHITECTURE.md`.

## Stack
- **Frontend:** Next.js 16 + React 19 + TypeScript (App Router), Tailwind
- **Backend:** AWS Lambda (Node.js 20) + API Gateway (REST)
- **Data:** DynamoDB (single-table) + S3 (images); Aurora MySQL (RDS) for pricing (Phase 4)
- **Events:** Kinesis (inventory/price updates)
- **AI:** Amazon Bedrock — Claude (LLM) + Titan (embeddings) for RAG vehicle search
- **IaC / CI:** AWS SAM + GitHub Actions (TDD, lint, deploy)

## Documentation
- [Architecture](docs/ARCHITECTURE.md) — system shape, data model, tradeoffs
- [ADR log](docs/adr/) — one decision per record (Next.js, serverless, DynamoDB, SAM, Bedrock)
- [Roadmap](docs/ROADMAP.md) — Now / Next / Later
- [Phases](docs/PHASES.md) — work breakdown, status, dependencies
- [AI-assisted development](docs/ai-assisted-development.md) — workflow + review gates
- [Style guide](docs/style-guide.md) — non-lintable conventions

**For AI agents:** see [AGENTS.md](AGENTS.md).

## Deploy (Free Tier)
```bash
# prerequisites
aws configure                # set AWS credentials + region

# backend (Lambda + API Gateway + DynamoDB + S3)
cd backend && sam build && sam deploy --guided

# frontend (Next.js)
cd frontend && npm install && npm run dev   # or deploy via Amplify/Vercel
```

## Honesty note
Project-level demo with synthetic data — not production at scale.
