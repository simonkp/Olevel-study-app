type ScoreInput = {
  correct: boolean;
  difficultyLevel: number;
  noveltyScore: number;
  latencyMs: number;
  mode: "PRACTICE" | "SCORED";
  isRepeatedSet: boolean;
  activityType: "quiz" | "flashcards" | "games";
  attemptsTodayByType: number;
};

const DAILY_XP_CAP: Record<ScoreInput["activityType"], number> = {
  quiz: 500,
  flashcards: 150,
  games: 120,
};

export function computeNoveltyScore(recentAttempts: number) {
  if (recentAttempts <= 1) return 1;
  if (recentAttempts <= 3) return 0.6;
  if (recentAttempts <= 6) return 0.3;
  return 0.1;
}

export function computeAttemptXp(input: ScoreInput) {
  if (input.mode === "PRACTICE") {
    return { xp: 0, capped: false };
  }

  const base = input.correct ? 12 : 0;
  const difficultyBoost = Math.max(1, Math.min(3, input.difficultyLevel));
  const speedBoost = input.latencyMs < 7000 ? 1.15 : 1;
  const repeatPenalty = input.isRepeatedSet ? 0.35 : 1;
  const novelty = Math.max(0.05, Math.min(1, input.noveltyScore));

  const rawXp = Math.round(base * difficultyBoost * speedBoost * novelty * repeatPenalty);
  const cap = DAILY_XP_CAP[input.activityType];
  const estimatedTotal = input.attemptsTodayByType * 10 + rawXp;
  if (estimatedTotal > cap) {
    return { xp: 0, capped: true };
  }

  return { xp: rawXp, capped: false };
}
