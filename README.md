# Ledger

A habit tracker built on James Clear's Four Laws of Behavior Change: make it obvious, attractive, easy and satisfying.

Architecture A — a layered modular monolith in one Next.js app.

## Getting started

Requires Node 22.

```bash
npm install
cp .env.example .env
npm run db:migrate   # creates ledger.db from drizzle/
npm run dev          # http://localhost:3000
```

## Project layout

```text
src/
  domain/          # pure functions + types; imports nothing from the folders below
  application/     # use cases: createHabit, checkIn, getDashboard
  infrastructure/  # Drizzle schema + DB client, auth config
  app/             # Next.js routes, pages, server actions
  components/      # React UI
drizzle/           # generated SQL migrations
```

The one rule: `src/domain` stays framework-free so streak and schedule logic can be unit-tested in milliseconds.

## Scripts

| Command                           | What it does                                  |
| --------------------------------- | --------------------------------------------- |
| `npm run dev`                     | Start the dev server                          |
| `npm run lint`                    | ESLint                                        |
| `npm run format` / `format:check` | Prettier write / check                        |
| `npm run typecheck`               | TypeScript, no emit                           |
| `npm test`                        | Vitest once (`test:watch` to keep it running) |
| `npm run test:coverage`           | Tests + coverage gate (90% on `src/domain`)   |
| `npm run db:generate`             | New migration after editing `schema.ts`       |
| `npm run db:migrate`              | Apply migrations to the local DB              |
| `npm run db:studio`               | Browse the DB in Drizzle Studio               |

CI (`.github/workflows/ci.yml`) runs lint, format check, typecheck, tests with coverage, and build on every pull request.

## Roadmap

- [x] Week 1 — Foundations (repo, schema, CI, empty dashboard)
- [ ] Week 2 — Domain core: `isScheduled`, `currentStreak`, `bestStreak`, `isAtRisk`
- [ ] Week 3 — Auth and habit CRUD
- [ ] Week 4 — Check-ins and Today view
- [ ] Week 5 — Streaks, heatmap, habit scorecard
- [ ] Week 6 — Deploy (Vercel + Neon)
