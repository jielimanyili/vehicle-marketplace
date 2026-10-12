# ADR-004: Use SAM over CDK for IaC

**Date:** 2026-10-10
**Status:** Accepted

## Context
The project is a serverless demo that needs declarative, reviewable infrastructure with a fast path to `sam build && sam deploy`.

## Decision
Use AWS SAM for Infrastructure-as-Code.

## Rationale
SAM is purpose-built for serverless (Lambda/API Gateway/DynamoDB) with minimal ceremony, and its local testing (`sam local`) helps iterate without deploying.

## Alternatives considered
- **CDK (TypeScript)** — more flexible for complex infra, but heavier for a small serverless app; swap if the project grows.

## Consequences
**Positive**
- Simple, declarative, quick deploy + local invoke.

**Negative / trade-offs**
- Less flexible than CDK for non-serverless resources.
