import { PrismaClient, User } from "@prisma/client";

export async function insertSeedDataForUser(prisma: PrismaClient, user: User) {
  await recordMeal(prisma, user);
  await recordWeight(prisma, user);
  await recordExercise(prisma, user);
}

async function recordWeight(prisma: PrismaClient, user: User) {
  await prisma.weightRecord.create({
    data: {
      date: new Date(),
      weight: 70,
      userId: user.id,
    },
  });
}

async function recordMeal(prisma: PrismaClient, user: User) {
  const meal = await prisma.meal.create({
    data: {
      name: "Breakfast",
      time: new Date(),
      notes: "Oatmeal with fruits and nuts",
      userId: user.id,
      servingSize: "bowl",
      servings: 1,
      calories: 300,
      mealType: "Breakfast",
    },
  });

  const carbs = await prisma.nutrition.create({
    data: {
      name: "Carbs",
    },
  });

  const dietaryFibers = await prisma.nutrition.create({
    data: {
      name: "Dietary Fibers",
    },
  });

  await prisma.nutritionInfo.create({
    data: {
      amount: 200,
      mealId: meal.id,
      nutritionId: carbs.id,
    },
  });

  await prisma.nutritionInfo.create({
    data: {
      amount: 30,
      mealId: meal.id,
      nutritionId: dietaryFibers.id,
    },
  });
}
async function recordExercise(prisma: PrismaClient, user: User) {
  const exc = await prisma.exercise.create({
    data: {
      name: "Bodyweight Lunge",
      muscles: {
        connectOrCreate: ["Quadriceps", "Glutes", "Soleus", "Adductors", "Abductors"].map((muscleName) => ({
          where: { name: muscleName },
          create: { name: muscleName },
        })),
      },
    },
  });
  await prisma.exercisePlan.create({
    data: {
      day: new Date(),
      sets: 3,
      repetitions: 10,
      exerciseId: exc.id,
      userId: user.id,
    },
  });

  await prisma.exerciseRecord.create({
    data: {
      day: new Date(),
      sets: 3,
      repetitions: 12, // The user did 2 extra repetitions
      exerciseId: exc.id,
      userId: user.id,
    },
  });
}
