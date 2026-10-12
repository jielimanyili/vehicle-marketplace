# ADR-003: DynamoDB single-table design

**Date:** 2026-10-10
**Status:** Accepted

## Context
Access patterns are known and key-based: get a vehicle by ID, list by status/price, search. Relational joins aren't needed; latency and horizontal scale are.

## Decision
Use DynamoDB with a single-table design (composite PK/SK + a GSI for search).

## Rationale
Single-table design gives fast, join-free lookups and predictable scaling — and it demonstrates key modeling, the thing that separates "knows DynamoDB" from "used DynamoDB."

## Alternatives considered
- **Relational (Aurora MySQL)** — flexible SQL, but slower to model for this access pattern; reserved for pricing/history in a later phase.

## Consequences
**Positive**
- Fast key lookups, no joins, Free-Tier storage.

**Negative / trade-offs**
- Must model access patterns up front; no ad-hoc SQL.
