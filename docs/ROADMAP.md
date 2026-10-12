# Roadmap

> Ordering over dates; each item links to its ADR(s).

## Now
- **Phase 1 — Backend MVP:** Lambda + API Gateway + DynamoDB (single-table) + S3 + seed → [ADR-002](adr/adr-002-serverless-over-containers.md) · [ADR-003](adr/adr-003-dynamodb-single-table.md) · [ADR-004](adr/adr-004-sam-over-cdk.md)
- **Phase 2 — Next.js storefront:** SSR listings, search, VDP, filters → [ADR-001](adr/adr-001-nextjs-over-react-spa.md)

## Next
- **Phase 3 — RAG assistant:** Bedrock embeddings + Claude → [ADR-005](adr/adr-005-bedrock-over-openai.md)

## Later
- **Phase 4 — Events + GraphQL:** Kinesis stream, AppSync
- **Phase 5 — Hardening:** TDD, CI/CD, CloudWatch observability
