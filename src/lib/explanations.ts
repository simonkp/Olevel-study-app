import crypto from "node:crypto";

import { ExplanationSource, Prisma, QuestionBank } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getCachedExplanation(input: {
  question: QuestionBank;
  wrongOptionIndex: number;
}) {
  const record = await prisma.explanationCache.findUnique({
    where: {
      questionId_wrongOptionIndex_difficultyLevel_conceptVersion: {
        questionId: input.question.id,
        wrongOptionIndex: input.wrongOptionIndex,
        difficultyLevel: input.question.difficultyLevel,
        conceptVersion: input.question.conceptVersion,
      },
    },
  });
  return record?.explanation ?? null;
}

function fallbackTemplate(question: QuestionBank, wrongOptionIndex: number) {
  const options = (question.optionsJson as Prisma.JsonArray).map((x) => String(x));
  const picked = options[wrongOptionIndex] ?? "your selected option";
  const correct = options[question.correctIndex] ?? "the correct option";
  return `You chose "${picked}". The best answer is "${correct}". ${question.explanation}`;
}

async function llmGenerate(input: {
  question: QuestionBank;
  wrongOptionIndex: number;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { explanation: fallbackTemplate(input.question, input.wrongOptionIndex), source: "TEMPLATE" as const };
  }

  const options = (input.question.optionsJson as Prisma.JsonArray).map((x) => String(x));
  const wrong = options[input.wrongOptionIndex];
  const correct = options[input.question.correctIndex];
  const prompt = [
    "Explain this wrong answer in <=90 words.",
    "Output only the explanation.",
    `Question: ${input.question.prompt}`,
    `Chosen wrong option: ${wrong}`,
    `Correct option: ${correct}`,
    `Reference rationale: ${input.question.explanation}`,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 140,
    }),
  });

  if (!response.ok) {
    return { explanation: fallbackTemplate(input.question, input.wrongOptionIndex), source: "TEMPLATE" as const };
  }

  const json = (await response.json()) as {
    output_text?: string;
  };
  const text = (json.output_text || "").trim();
  if (!text) {
    return { explanation: fallbackTemplate(input.question, input.wrongOptionIndex), source: "TEMPLATE" as const };
  }

  return { explanation: text, source: "LLM" as const };
}

export async function resolveExplanation(input: {
  question: QuestionBank;
  wrongOptionIndex: number;
}) {
  const cached = await getCachedExplanation(input);
  if (cached) return { explanation: cached, cached: true };

  const generated = await llmGenerate(input);
  const promptHash = crypto
    .createHash("sha256")
    .update(`${input.question.id}:${input.wrongOptionIndex}:${input.question.conceptVersion}`)
    .digest("hex");

  await prisma.explanationCache.create({
    data: {
      questionId: input.question.id,
      wrongOptionIndex: input.wrongOptionIndex,
      difficultyLevel: input.question.difficultyLevel,
      conceptVersion: input.question.conceptVersion,
      explanation: generated.explanation,
      source: generated.source as ExplanationSource,
      promptHash,
    },
  });

  return { explanation: generated.explanation, cached: false };
}
