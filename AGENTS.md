# Study Platform Agent Rules

- Primary app is now Next.js at repo root (`src`, `prisma`, `scripts`). Legacy static app is under `old-html-js/`.
- Ignore gitignored folders/files and do not use `old-html-js/` for new features unless explicitly requested.
- Use `pnpm` commands (`pnpm dev`, `pnpm lint`, `pnpm build`, `pnpm db:migrate`, `pnpm db:seed`), not npm.
- Source of truth for runtime learning content is PostgreSQL via Prisma models, not flat files.
- Content ingestion flow:
  1) import draft questions via `scripts/import-questions.ts` or `POST /api/content/import`,
  2) keep `needsReview=true`,
  3) approve/reject through `GET|POST /api/content/review`,
  4) only approved (`needsReview=false` + `active=true`) items appear in study APIs.
- Adaptive generation (`POST /api/content/generate-adaptive`) creates draft questions (`needsReview=true`) and requires manual review before use.
- Study delivery APIs (`/api/study/*`) select from approved DB questions and apply server-authoritative scoring + anti-farming rules.
- AI explanations are cached in `ExplanationCache` by `(questionId, wrongOptionIndex, difficultyLevel, conceptVersion)` and reused on subsequent misses.
