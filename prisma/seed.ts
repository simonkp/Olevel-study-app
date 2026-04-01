import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const parentEmail = "parent@levelup.local";
  const childEmail = "child@levelup.local";
  const defaultPassword = "ChangeMe123!";

  const parentPasswordHash = await bcrypt.hash(defaultPassword, 10);
  const childPasswordHash = await bcrypt.hash(defaultPassword, 10);

  const parent = await prisma.user.upsert({
    where: { email: parentEmail },
    update: { passwordHash: parentPasswordHash, role: UserRole.PARENT },
    create: {
      email: parentEmail,
      name: "Parent",
      passwordHash: parentPasswordHash,
      role: UserRole.PARENT,
      parentProfile: { create: {} },
    },
    include: { parentProfile: true },
  });

  if (!parent.parentProfile) {
    throw new Error("Parent profile missing after upsert");
  }

  await prisma.user.upsert({
    where: { email: childEmail },
    update: { passwordHash: childPasswordHash, role: UserRole.CHILD },
    create: {
      email: childEmail,
      name: "Child",
      passwordHash: childPasswordHash,
      role: UserRole.CHILD,
      childProfile: {
        create: { parentId: parent.parentProfile.id },
      },
    },
  });

  const rewards = [
    { code: "screen-time", label: "Extra screen time 10 minutes", xpCost: 500 },
    { code: "bubble", label: "Bubble tea", xpCost: 1500 },
    { code: "friend-visit", label: "1 hr friend visit", xpCost: 3000 },
  ];

  for (const reward of rewards) {
    await prisma.rewardCatalog.upsert({
      where: { code: reward.code },
      update: reward,
      create: reward,
    });
  }

  const chemistry = await prisma.subject.upsert({
    where: { code: "chemistry" },
    update: { title: "O-Level Chemistry" },
    create: { code: "chemistry", title: "O-Level Chemistry" },
  });

  const topic = await prisma.topic.upsert({
    where: { subjectId_code: { subjectId: chemistry.id, code: "1" } },
    update: { title: "Experimental Design", orderIndex: 1 },
    create: {
      subjectId: chemistry.id,
      code: "1",
      title: "Experimental Design",
      orderIndex: 1,
      difficultyBand: 1,
    },
  });

  const concept = await prisma.concept.upsert({
    where: { topicId_code: { topicId: topic.id, code: "variables" } },
    update: { title: "Variables in fair tests" },
    create: {
      topicId: topic.id,
      code: "variables",
      title: "Variables in fair tests",
    },
  });

  const question = await prisma.questionBank.create({
    data: {
      topicId: topic.id,
      prompt: "Fair test requires changing:",
      optionsJson: [
        "Only one independent variable",
        "All variables",
        "Only the dependent variable",
        "Nothing",
      ],
      correctIndex: 0,
      explanation: "A fair test isolates one independent variable at a time.",
      difficultyLevel: 1,
      source: "seed",
      conceptLinks: {
        create: [{ conceptId: concept.id }],
      },
    },
  });

  await prisma.explanationCache.upsert({
    where: {
      questionId_wrongOptionIndex_difficultyLevel_conceptVersion: {
        questionId: question.id,
        wrongOptionIndex: 1,
        difficultyLevel: 1,
        conceptVersion: 1,
      },
    },
    update: {},
    create: {
      questionId: question.id,
      wrongOptionIndex: 1,
      difficultyLevel: 1,
      conceptVersion: 1,
      explanation:
        "Changing all variables prevents you from knowing which factor caused the result.",
      source: "TEMPLATE",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
