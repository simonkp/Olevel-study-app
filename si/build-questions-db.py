#!/usr/bin/env python3
"""Parse is5126-quiz-w1-9.html and generate questions-db.js. L1: skip Q5 (quiz %), Q11 (due dates)."""
import re
import json

CHAPTER_TITLES = {
    "l1": "Lecture 1 — Course Introduction",
    "l2": "Lecture 2 — Data Processing, Storage & Retrieval",
    "l3": "Lecture 3 — Regression and Classification I",
    "l4": "Lecture 4 — Regression and Classification II",
    "l5": "Lecture 5 — Unsupervised Learning",
    "l7": "Lecture 7 — Model Deployment",
    "l8": "Lecture 8 — Neural Nets I",
    "l9": "Lecture 9 — RNN & LSTM",
}
L1_SKIP = {"L1-Q5", "L1-Q11"}


def _truncate(s: str, max_len: int = 80) -> str:
    s = s.strip()
    if len(s) <= max_len:
        return s
    return s[: max_len - 1].rsplit(" ", 1)[0] + "…" if " " in s[:max_len] else s[: max_len - 1] + "…"


def _build_explain_options(options: dict, correct: str, explain: str) -> dict:
    """Per-option: correct gets full explain; wrong options only describe what that option is (no 'correct answer is' — UI shows all feedback together)."""
    out = {}
    for k in "ABCD":
        opt_text = options.get(k, "")
        if k == correct:
            out[k] = explain
        else:
            short = _truncate(opt_text, 70)
            out[k] = f"This option describes: \"{short}\"."
    return out


def main():
    with open("is5126-quiz-w1-9.html", "r", encoding="utf-8") as f:
        html = f.read()

    # Split by opening of quiz-card (each card starts with <div class="quiz-card")
    parts = re.split(r'\s*<div class="quiz-card"\s+onclick=', html)
    questions = []
    for block in parts[1:]:  # skip first (header)
        # Extract q-num
        qnum_m = re.search(r'<span class="q-num">([^<]+)</span>', block)
        if not qnum_m:
            continue
        qid = qnum_m.group(1).strip().rstrip(".").replace(" ", "")  # L1-Q1
        if qid in L1_SKIP:
            continue
        # Extract q-text (only content before first </span>)
        qtext_m = re.search(r'<span class="q-text">([^<]+)</span>', block)
        text = qtext_m.group(1).strip() if qtext_m else ""
        # Options
        opts_html = ""
        ul_m = re.search(r'<ul class="options">(.*?)</ul>', block, re.DOTALL)
        if ul_m:
            opts_html = ul_m.group(1)
        opt_pat = re.compile(r'<li>([A-D])\.\s*([^<]+)</li>')
        options = {}
        for om in opt_pat.finditer(opts_html):
            options[om.group(1)] = om.group(2).strip()
        if len(options) != 4:
            continue
        # Answer: correct letter + explanation
        ans_m = re.search(r'<div class="answer"><span class="correct">([A-D])\.</span>\s*([^<]*(?:<[^>]+>[^<]*)*)</div>', block)
        if not ans_m:
            continue
        correct = ans_m.group(1).strip()
        explain = re.sub(r"<[^>]+>", "", ans_m.group(2)).strip()

        ch_num = re.match(r"L(\d+)-", qid)
        ch_key = "l" + ch_num.group(1) if ch_num else "l1"
        chapter_title = CHAPTER_TITLES.get(ch_key, f"Lecture {ch_num.group(1) if ch_num else 1}")

        explain_options = _build_explain_options(options, correct, explain)

        questions.append({
            "id": qid,
            "chapter": ch_key,
            "chapterTitle": chapter_title,
            "text": text,
            "options": options,
            "correct": correct,
            "explainCorrect": explain,
            "explainOptions": explain_options,
        })

    js = "// IS5126 Quiz — question database. Edit to add/remove/edit questions.\n"
    js += "// Schema: id, chapter, chapterTitle, text, options, correct (string or string[] for multi-select), explainCorrect, explainOptions (per-option: what that option means / why right or wrong)\n\n"
    js += "const QUIZ_DB = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";\n\n"
    js += "if (typeof module !== 'undefined' && module.exports) module.exports = { QUIZ_DB };\n"
    with open("questions-db.js", "w", encoding="utf-8") as f:
        f.write(js)
    print(f"Wrote {len(questions)} questions to questions-db.js (skipped L1-Q5, L1-Q11)")

if __name__ == "__main__":
    main()
