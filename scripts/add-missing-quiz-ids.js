import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve paths relative to THIS script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root (one level up from /scripts)
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Chemistry data root
const ROOT = path.join(
  PROJECT_ROOT,
  "DATA",
  "SUBJECTS",
  "chemistry"
);

const THEMES = [
  "theme1-matter",
  "theme2-reactions",
  "theme3-sustainable"
];

for (const theme of THEMES) {
  const themePath = path.join(ROOT, theme);

  const files = fs
    .readdirSync(themePath)
    .filter(f => /^topic-\d{2}\.js$/.test(f));

  for (const file of files) {
    const topicNumber = file.match(/\d{2}/)[0];
    const filePath = path.join(themePath, file);

    let content = fs.readFileSync(filePath, "utf8");

    const quizMatch = content.match(
      /quiz:\s*(\[[\s\S]*?\])\s*,\s*trueFalse:/
    );
    if (!quizMatch) {
      console.warn(`⚠️ No quiz array found in ${file}`);
      continue;
    }

    const quiz = eval(quizMatch[1]);

    let counter = 1;
    const prefix = `chem-topic-${topicNumber}`;

    for (const q of quiz) {
      if (!q.id) {
        q.id = `${prefix}-${String(counter).padStart(3, "0")}`;
        counter++;
      }
    }

    const updatedQuiz =
      "quiz: " + JSON.stringify(quiz, null, 2) + ",\n    trueFalse:";

    content = content.replace(
      /quiz:\s*\[[\s\S]*?\]\s*,\s*trueFalse:/,
      updatedQuiz
    );

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated ${theme}/${file}`);
  }
}

console.log("🎉 Done — missing quiz IDs added (per file)");