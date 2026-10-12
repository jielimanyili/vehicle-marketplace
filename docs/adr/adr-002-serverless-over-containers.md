# ADR-002: Use serverless (Lambda) over containers

**Date:** 2026-10-10
**Status:** Accepted

## Context
The target stack is serverless AWS. The workload is bursty (listings/search) with no always-on traffic. We want Free-Tier-friendly, zero-ops scaling.

## Decision
Use AWS Lambda (Node.js 20) behind API Gateway for the backend functions.

## Rationale
Lambda matches the target stack, scales to zero (no idle cost), and fits Free Tier. Per-function isolation keeps handlers small and testable.

## Alternatives considered
- **Containers (ECS/Fargate)** — more control, but always-on cost and more ops for a demo.

## Consequences
**Positive**
- Zero-ops scaling, Free-Tier-friendly, matches the JD.

**Negative / trade-offs**
- Cold starts; 15-minute / 6 MB limits; AWS-specific.
