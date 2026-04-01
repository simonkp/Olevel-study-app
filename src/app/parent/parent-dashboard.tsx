"use client";

import { useState } from "react";

type ChildOverview = {
  childId: string;
  name: string;
  xp: number;
  streakDays: number;
  accuracyPct: number;
  farmingRiskPct: number;
  weakMasteryCount: number;
  pendingRewards: Array<{ id: string; reward: { label: string; xpCost: number } }>;
};

type PendingQuestion = {
  id: string;
  prompt: string;
  topic: { title: string };
};

export function ParentDashboard({
  childRows,
  pendingQuestions,
}: {
  childRows: ChildOverview[];
  pendingQuestions: PendingQuestion[];
}) {
  const [message, setMessage] = useState("");

  async function resolveReward(redemptionId: string, action: "APPROVE" | "REJECT") {
    const res = await fetch("/api/rewards/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ redemptionId, action }),
    });
    if (!res.ok) {
      const body = await res.json();
      setMessage(body.error || "Failed to resolve reward");
      return;
    }
    setMessage(`Reward ${action.toLowerCase()}d.`);
    window.location.reload();
  }

  async function reviewQuestion(questionId: string, action: "approve" | "reject") {
    const res = await fetch("/api/content/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, action }),
    });
    if (!res.ok) {
      const body = await res.json();
      setMessage(body.error || "Failed to review question");
      return;
    }
    setMessage(`Question ${action}d.`);
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-3 text-xl font-semibold">Children overview</h2>
        <div className="grid gap-3">
          {childRows.map((child) => (
            <div key={child.childId} className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <strong>{child.name}</strong>
                <span>XP {child.xp}</span>
                <span>Streak {child.streakDays}d</span>
                <span>Accuracy {child.accuracyPct}%</span>
                <span>Weak concepts {child.weakMasteryCount}</span>
                <span>Farming risk {child.farmingRiskPct}%</span>
              </div>
              <div className="mt-3 space-y-2">
                {child.pendingRewards.map((pending) => (
                  <div
                    key={pending.id}
                    className="flex items-center justify-between rounded border border-zinc-200 px-2 py-2 text-sm dark:border-zinc-700"
                  >
                    <span>
                      {pending.reward.label} ({pending.reward.xpCost} XP)
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => resolveReward(pending.id, "APPROVE")}
                        className="rounded bg-emerald-600 px-2 py-1 text-white"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => resolveReward(pending.id, "REJECT")}
                        className="rounded bg-zinc-700 px-2 py-1 text-white"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="mb-3 text-xl font-semibold">Question review queue</h2>
        <div className="grid gap-3">
          {pendingQuestions.map((question) => (
            <div key={question.id} className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-700">
              <p className="font-medium">{question.prompt}</p>
              <p className="text-zinc-500">{question.topic.title}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => reviewQuestion(question.id, "approve")}
                  className="rounded bg-emerald-600 px-2 py-1 text-white"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => reviewQuestion(question.id, "reject")}
                  className="rounded bg-zinc-700 px-2 py-1 text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {!pendingQuestions.length ? <p className="text-sm text-zinc-500">No pending questions.</p> : null}
        </div>
      </section>
      {message ? <p className="text-sm">{message}</p> : null}
    </div>
  );
}
