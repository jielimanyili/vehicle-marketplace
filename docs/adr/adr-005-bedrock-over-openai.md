# ADR-005: Use Bedrock over an OpenAI-compatible endpoint for RAG

**Date:** 2026-10-10
**Status:** Accepted

## Context
The JD names AWS Bedrock for AI; keeping the stack in-AWS is on-target. The RAG assistant needs an LLM plus embeddings.

## Decision
Use Amazon Bedrock — Claude (LLM) + Titan (embeddings) — for the RAG vehicle-search assistant.

## Rationale
Bedrock is the named requirement and keeps everything in one account; Claude Haiku keeps demo cost to cents.

## Alternatives considered
- **OpenAI-compatible endpoint (e.g., DeepSeek)** — already available and cheap/free, but off-target vs the JD's Bedrock; usable as a fallback during local dev.

## Consequences
**Positive**
- On-target for the role; in-AWS; no external key management.

**Negative / trade-offs**
- Requires per-model opt-in in the Bedrock console; pay-per-token (small for a demo).
