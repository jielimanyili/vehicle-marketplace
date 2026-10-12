# Architecture — Vehicle Marketplace Modernization

## 1. Overview
A modernization demo: a legacy vehicle-selling application re-architected to a modern **serverless + Next.js** target state. It demonstrates the full Karsun stack — React/Node.js, serverless AWS, GraphQL/REST, event streaming, MySQL (RDS), and RAG/AI — in a shippable, verifiable way.

## 2. Goals / Non-goals
**Goals**
- Prove the target-state stack end-to-end: Next.js SSR storefront → API Gateway → Lambda → DynamoDB/S3 → Bedrock RAG.
- Justify the "Next.js vs plain React" decision with a real SSR/SSG storefront.
- Demonstrate serverless, event-driven, and AI/RAG patterns hands-on.

**Non-goals**
- Production at-scale (no multi-region, no real auth/billing, synthetic data).
- Real auction/bidding logic or payment.
- Training/fine-tuning models.

## 3. Component diagram
```
┌────────────────────────────────────────────┐
│  Next.js 16 + React 19 (App Router)         │
│  SSR/SSG listings · search · VDP · islands  │
└────────────────────┬───────────────────────┘
                     │ REST (HTTPS)
┌────────────────────▼───────────────────────┐
│  Amazon API Gateway                         │
└────────────────────┬───────────────────────┘
                     │
┌────────────────────▼───────────────────────┐
│  AWS Lambda (Node.js 20)                    │
│  vehicles CRUD · search · RAG orchestration │
└───┬──────────┬──────────┬──────────┬────────┘
    │          │          │          │
 DynamoDB     S3      Kinesis     Bedrock
 (inventory, (images) (events)   (Claude + Titan
  single-table)                    embeddings → RAG)
                                   + Aurora MySQL (RDS)
```

## 4. Components
- **Next.js storefront** — App Router; Server Components fetch listings server-side and stream them; `"use client"` only at interactive boundaries (filters, search box). SSR/SSG is the SEO answer.
- **API Gateway** — REST front door; GraphQL via AppSync in Phase 4.
- **Lambda (Node 20)** — thin handlers for vehicle CRUD, search, and RAG orchestration; single responsibility per function.
- **DynamoDB (single-table)** — vehicles, search index, sessions in one table (partition/sort keys + GSI) — no joins, fast lookups.
- **S3** — vehicle images (static, presigned upload).
- **Aurora MySQL (RDS)** — relational pricing/history (Phase 4); proves the MySQL/RDS keyword.
- **Kinesis** — inventory/price change events (Phase 4); alternative: DynamoDB Streams for free-tier simplicity.
- **Bedrock** — Claude (LLM) for generation + Titan (embeddings) for RAG over vehicle descriptions.

## 5. Data model (DynamoDB single-table)
| PK | SK | Example |
|---|---|---|
| `VEHICLE#<id>` | `META` | make/model/year/price/status |
| `VEHICLE#<id>` | `IMAGE#<n>` | S3 key |
| `QUERY#<term>` | `VEHICLE#<id>` | search index (GSI) |

## 6. Key decisions & tradeoffs

Full rationale lives in the ADR log: [ADR-001](adr/adr-001-nextjs-over-react-spa.md) · [ADR-002](adr/adr-002-serverless-over-containers.md) · [ADR-003](adr/adr-003-dynamodb-single-table.md) · [ADR-004](adr/adr-004-sam-over-cdk.md) · [ADR-005](adr/adr-005-bedrock-over-openai.md).
- **Next.js SSR over plain React** — SEO + Core Web Vitals are business-critical for a public marketplace; pay the Node-deployment cost.
- **Serverless (Lambda) over containers** — matches the target stack, scales to zero, Free-Tier-friendly.
- **DynamoDB single-table over many tables** — fast key-based lookups, no joins; requires modeling access patterns up front.
- **Bedrock over OpenAI** — the JD names Bedrock specifically; keeps everything in-AWS.
- **SAM over CDK** — less ceremony for a serverless demo; CDK is the swap if the team prefers TypeScript IaC.

## 7. Honesty boundary
Project-level, synthetic data, single region. It demonstrates *hands-on* serverless + RAG, not production-at-scale operations. The production-depth story remains Angular/Java (12 yrs) with this as the React/Node/AWS-serverless evidence.

## 8. Future work
- AppSync GraphQL, Kinesis, Aurora pricing history.
- Auth (Cognito), CloudWatch dashboards/alarms.
- RAG eval (faithfulness/relevance) — reuse the `ai-ads-surface` LLM-as-judge pattern.
