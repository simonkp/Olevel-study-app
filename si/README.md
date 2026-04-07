# IS5126 Quiz Practice

- **quiz-app.html** — New quiz UI: one question at a time, Previous/Next, select answer to see correct/wrong (red/green) and per-option explanations. Open this file in a browser.
- **questions-db.js** — Question database. Edit here to add, remove, or change questions, answers, and explanations.
- **is5126-quiz-w1-9.html** — Legacy click-to-reveal list (all questions on one page).

## Question DB schema (questions-db.js)

Each item in `QUIZ_DB`:

- `id` — e.g. "L1-Q1"
- `chapter` — "l1", "l2", … "l9"
- `chapterTitle` — Display name
- `text` — Question text
- `options` — `{ A: "...", B: "...", C: "...", D: "..." }`
- `correct` — "A" | "B" | "C" | "D"
- `explainCorrect` — Main explanation for the correct answer
- `explainOptions` — `{ A: "...", B: "...", C: "...", D: "..." }` — why each option is correct or wrong

L1 excludes timing/marks/exam dates (Q5 quiz weight, Q11 due date). To regenerate the DB from the legacy HTML, run:

```bash
python build-questions-db.py
```
