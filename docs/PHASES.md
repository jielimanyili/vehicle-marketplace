# Phases

| Phase | Goal | Deliverables | Depends on | Status |
|---|---|---|---|---|
| 0 | Repo scaffold + IaC + CI skeleton | SAM template, Next.js scaffold, GitHub Actions | — | ✅ |
| 1 | Backend MVP | Lambda CRUD/search, DynamoDB single-table, S3, seed | 0 | 🟡 |
| 2 | Next.js storefront | SSR listings, search, VDP, filters | 1 | 🟡 |
| 3 | RAG assistant | Bedrock embeddings + Claude | 2 | ⬜ |
| 4 | Events + GraphQL | Kinesis stream, AppSync | 3 | ⬜ |
| 5 | Hardening | TDD, CI/CD, CloudWatch | 4 | ⬜ |

Status legend: ⬜ planned · 🟡 in progress · ✅ done
