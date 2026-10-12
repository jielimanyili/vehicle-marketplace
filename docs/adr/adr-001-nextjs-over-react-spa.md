# ADR-001: Use Next.js (SSR) over a plain React SPA

**Date:** 2026-10-10
**Status:** Accepted

## Context
The public storefront is SEO-critical — buyers discover listings through search. A plain React SPA ships an empty `<div id="root">`, hurting crawlability, social/OG previews, and first paint. The role explicitly probes "Next.js vs plain React for modernising a vehicle-selling app."

## Decision
Use Next.js (App Router) with SSR/SSG for listings, search, and vehicle detail pages; mark interactive pieces (filters, search box) as `"use client"` islands.

## Rationale
Server rendering guarantees crawlability and fast LCP; Server Components eliminate the client-side data-fetch waterfall; `next/image` optimizes vehicle imagery. For a public marketplace, SEO + Core Web Vitals are business-critical.

## Alternatives considered
- **Plain React SPA** — simpler + static hosting, but loses SEO/CWV for a public storefront.

## Consequences
**Positive**
- Crawlable, fast-first-paint listing pages; smaller client bundle.

**Negative / trade-offs**
- Requires a Node deployment (not static hosting) and team ramp on Server Components.
