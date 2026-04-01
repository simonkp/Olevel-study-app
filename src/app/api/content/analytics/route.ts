import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

export async function GET() {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const questions = await prisma.questionBank.findMany({
    where: { active: true },
    include: { attempts: true, topic: true },
  });

  const byQuestion = questions.map((question) => {
    const total = question.attempts.length;
    const correct = question.attempts.filter((a) => a.correct).length;
    const facility = total ? correct / total : null;
    return {
      questionId: question.id,
      topic: question.topic.title,
      prompt: question.prompt,
      attempts: total,
      facilityIndex: facility,
      flaggedHard: facility !== null && facility < 0.25,
      flaggedEasy: facility !== null && facility > 0.9,
    };
  });

  return NextResponse.json({
    totalQuestions: questions.length,
    underReview: questions.filter((q) => q.needsReview).length,
    generated: questions.filter((q) => q.generatedByAi).length,
    byQuestion,
  });
}
