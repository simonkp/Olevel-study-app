"use client";

import { useMemo, useState } from "react";

type Topic = { id: string; title: string };
type Reward = { id: string; label: string; xpCost: number };
type Question = { id: string; prompt: string; options: string[]; difficultyLevel: number };

export function ChildDashboard({
  topics,
  rewards,
  xp,
}: {
  topics: Topic[];
  rewards: Reward[];
  xp: number;
}) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string>(topics[0]?.id ?? "");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [explanation, setExplanation] = useState("");
  const [localXp, setLocalXp] = useState(xp);

  const current = questions[idx];

  const canStart = useMemo(() => Boolean(topicId), [topicId]);

  async function startRound() {
    setFeedback("");
    setExplanation("");
    const sessionRes = await fetch("/api/study/start-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, mode: "SCORED" }),
    });
    const sessionData = await sessionRes.json();
    setSessionId(sessionData.sessionId);

    const qRes = await fetch(`/api/study/next-questions?topicId=${topicId}&targetDifficulty=1`);
    const qData = await qRes.json();
    setQuestions(qData.questions ?? []);
    setIdx(0);
  }

  async function submitAnswer(selectedIndex: number) {
    if (!current || !sessionId) return;
    setFeedback("");
    setExplanation("");
    const res = await fetch("/api/study/submit-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: current.id,
        selectedIndex,
        latencyMs: 1000,
        mode: "SCORED",
        sessionId,
        activityType: "quiz",
      }),
    });
    const data = await res.json();
    setFeedback(data.correct ? `Correct (+${data.xpAwarded} XP)` : "Wrong");
    if (typeof data.xpAwarded === "number") {
      setLocalXp((old) => old + data.xpAwarded);
    }

    if (!data.correct) {
      const exRes = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: current.id, wrongOptionIndex: selectedIndex }),
      });
      const exData = await exRes.json();
      setExplanation(exData.explanation ?? "");
    }

    setIdx((old) => old + 1);
  }

  async function requestReward(rewardId: string) {
    const res = await fetch("/api/rewards/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rewardId }),
    });
    if (res.ok) {
      setFeedback("Reward request sent to parent for approval.");
    } else {
      const body = await res.json();
      setFeedback(body.error || "Failed to request reward.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">XP: {localXp}</h2>
        <p className="text-sm text-zinc-500">Scoring uses anti-farming rules and mastery weighting.</p>
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="mb-2 text-lg font-semibold">Adaptive quiz</h3>
        <div className="mb-3 flex gap-2">
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={!canStart}
            onClick={startRound}
            className="rounded-md bg-zinc-900 px-3 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            Start round
          </button>
        </div>
        {current ? (
          <div className="space-y-2">
            <p className="font-medium">{current.prompt}</p>
            <div className="grid gap-2">
              {current.options.map((option, optionIndex) => (
                <button
                  key={`${current.id}-${optionIndex}`}
                  type="button"
                  onClick={() => submitAnswer(optionIndex)}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-left dark:border-zinc-700"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Start a round to load questions.</p>
        )}
      </div>

      <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="mb-2 text-lg font-semibold">Rewards</h3>
        <div className="grid gap-2">
          {rewards.map((reward) => (
            <button
              key={reward.id}
              type="button"
              className="rounded-md border border-zinc-300 px-3 py-2 text-left dark:border-zinc-700"
              onClick={() => requestReward(reward.id)}
            >
              {reward.label} ({reward.xpCost} XP)
            </button>
          ))}
        </div>
      </div>

      {feedback ? <p className="text-sm">{feedback}</p> : null}
      {explanation ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
          {explanation}
        </div>
      ) : null}
    </div>
  );
}
