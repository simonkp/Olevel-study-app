import { readFile } from "node:fs/promises";

import { PrismaClient } from "@prisma/client";

type ImportQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficultyLevel: 1 | 2 | 3;
  conceptCodes: string[];
};

type ImportPayload = {
  topicCode: string;
  subjectCode: string;
  sourceRef?: string;
  questions: ImportQuestion[];
};

const prisma = new PrismaClient();

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error("Usage: npm run import:questions -- <path-to-json>");
  }

  const raw = await readFile(filePath, "utf-8");
  const payload = JSON.parse(raw) as ImportPayload;

  const subject = await prisma.subject.findUnique({
    where: { code: payload.subjectCode },
  });
  if (!subject) throw new Error(`Subject not found: ${payload.subjectCode}`);

  const topic = await prisma.topic.findUnique({
    where: {
      subjectId_code: {
        subjectId: subject.id,
        code: payload.topicCode,
      },
    },
    include: { concepts: true },
  });
  if (!topic) throw new Error(`Topic not found: ${payload.topicCode}`);

  for (const question of payload.questions) {
    const conceptIds = topic.concepts
      .filter((concept) => question.conceptCodes.includes(concept.code))
      .map((concept) => concept.id);

    await prisma.questionBank.create({
      data: {
        topicId: topic.id,
        prompt: question.prompt,
        optionsJson: question.options,
        correctIndex: question.correctIndex,
        explanation: question.explanation,
        difficultyLevel: question.difficultyLevel,
        source: "guidebook-import",
        sourceRef: payload.sourceRef,
        needsReview: true,
        conceptLinks: {
          create: conceptIds.map((conceptId) => ({ conceptId })),
        },
      },
    });
  }

  console.log(`Imported ${payload.questions.length} questions to ${payload.subjectCode}/${payload.topicCode}`);
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
