# O-Level Study App - Core Principles

- Scope: Singapore MOE-aligned O-Level learning app, currently for Chemistry and Physics, with subject-specific progress.
- Entry design: Subject hub (`index.html`) routes into one generic subject shell (`subject.html?subject=<id>`).
- Learning loop per topic: Notes -> Visuals -> Flashcards -> Adaptive Quiz -> Games, with a consistent 5-tab flow.
- Content model: Each subject owns a topic manifest plus per-topic scripts that register structured learning objects (notes, cards, quizzes, games, visuals).
- Progression: Topic unlocking is mastery-gated by default (pass previous topic), with optional free-study unlock and harder challenge threshold.
- Engagement system: XP, daily streaks, per-question mastery, adaptive weak-question review, and daily challenge bonus.
- Game types: Matching pairs, sequence ordering, and true/false drills; each gives XP and reinforces topic recall.
- Boss battles: Theme-level mixed quiz bosses unlock after theme readiness and award large one-time XP plus permanent badges.
- Rewards economy: Parent-sponsored reward shop lets learners spend XP on coupon-style rewards tracked in-app.
- Persistence and portability: LocalStorage per subject, plus encrypted export/import code for cross-browser transfer.
- Hosting: Currently hosted in netlify.app free hosting.
