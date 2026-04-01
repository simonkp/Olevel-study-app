# Study Platform (Next.js Upgrade)

This folder contains the fullstack upgrade for the study app:

- Next.js App Router
- PostgreSQL + Prisma
- NextAuth credentials login with parent/child roles
- Server-authoritative scoring + anti-farming XP
- Adaptive question selection (difficulty + weak-concept targeting)
- Reward request + parent approval workflow
- Explanation cache with optional LLM generation on cache miss

## Setup

1. Copy envs:

```bash
cp .env.example .env
```

2. Set `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`.
3. Run migrations and seed:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

4. Start app:

```bash
pnpm dev
```

## Default seeded accounts

- Parent: `parent@levelup.local` / `ChangeMe123!`
- Child: `child@levelup.local` / `ChangeMe123!`

Change these immediately after first login.

## Implemented APIs

- `POST /api/study/start-session`
- `GET /api/study/next-questions`
- `POST /api/study/submit-attempt`
- `POST /api/ai/explain`
- `GET /api/parent/overview`
- `POST /api/rewards/request`
- `POST /api/rewards/resolve`
- `POST /api/content/import`
- `GET|POST /api/content/review`
- `POST /api/content/generate-adaptive`
