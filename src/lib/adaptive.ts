import { QuestionBank } from "@prisma/client";

type AdaptiveInput = {
  questions: QuestionBank[];
  weakConceptQuestionIds: Set<string>;
  targetDifficulty: number;
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickAdaptiveQuestions({
  questions,
  weakConceptQuestionIds,
  targetDifficulty,
}: AdaptiveInput) {
  const currentLevel = questions.filter((q) => q.difficultyLevel === targetDifficulty);
  const weak = questions.filter((q) => weakConceptQuestionIds.has(q.id));
  const stretch = questions.filter((q) => q.difficultyLevel === targetDifficulty + 1);

  const selected: QuestionBank[] = [];
  const used = new Set<string>();

  const pickFrom = (pool: QuestionBank[], count: number) => {
    for (const q of shuffle(pool)) {
      if (selected.length >= 20 || count <= 0) break;
      if (used.has(q.id)) continue;
      selected.push(q);
      used.add(q.id);
      count -= 1;
    }
  };

  pickFrom(currentLevel, 12);
  pickFrom(weak, 5);
  pickFrom(stretch, 3);

  if (selected.length < 20) {
    pickFrom(questions, 20 - selected.length);
  }

  return selected.slice(0, 20);
}

export function shouldGenerateAdaptiveQuestions(params: {
  repeatedMissesOnConcept: number;
  highMasteryRun: number;
}) {
  return {
    weakRemediation: params.repeatedMissesOnConcept >= 3,
    highMasteryRefresh: params.highMasteryRun >= 12,
  };
}
