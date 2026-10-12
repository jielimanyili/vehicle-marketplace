# Style Guide

> Prose conventions that linters/formatters don't cover. Enforced rules live in the linter/formatter config.

## TypeScript
- Prefer `interface` over `type` for object shapes.
- Use `readonly` on props/fields by default.
- Avoid `any`; use `unknown` + narrowing.

## React / Next.js
- Functional components + hooks only; no class components.
- Server Components by default; `"use client"` only at the interactive boundary (see ADR-001).
- Data fetching in Server Components; client state via hooks.

## Naming
- Components: PascalCase · hooks: `use*` · files: kebab-case · env vars: UPPER_SNAKE_CASE.

## Links
- Linter: ESLint (`frontend/eslint.config.*`)
- Formatter: Prettier (`frontend/.prettierrc`)
