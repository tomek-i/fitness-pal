import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
    },
  });
  const user = await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      email: "john.doe@example.com",
      name: "John Doe",
    },
  });

  console.log("Users created:", { admin, user });

  const _ = [
    {
      name: "Carbs",
      micros: [{ name: "Dietry Fibers" }, { name: "Sugars" }, { name: "Starch" }],
    },
    {
      name: "Fat",
      micros: [{ name: "Saturated Fat" }, { name: "Polyunsaturated Fat" }, { name: "Monounsaturated Fat" }],
    },
    {
      name: "Protein",
    },
  ];

  await prisma.weightRecord.create({
    data: {
      date: new Date(),
      weight: 70,
      userId: user.id,
    },
  });

  const macronutrients = await prisma.macronutrients.create({
    data: {
      carbs: 200,
      dietaryFibers: 30,
      sugars: 50,
      starch: 120,
      totalFat: 70,
      saturatedFat: 20,
      polyunsaturatedFat: 25,
      monounsaturatedFat: 25,
      transFat: 0,
      protein: 150,
    },
  });

  const micronutrients = await prisma.micronutrients.create({
    data: {
      cholesterol: 200,
      sodium: 2300,
      potassium: 4700,
    },
  });

  await prisma.meal.create({
    data: {
      name: "Breakfast",
      time: new Date(),
      notes: "Oatmeal with fruits and nuts",
      userId: user.id,
      macronutrientsId: macronutrients.id,
      micronutrientsId: micronutrients.id,
      servingSize: "bowl",
      servings: 1,
      calories: 300,
      mealType: "Breakfast",
    },
  });

  const exercises = [
    {
      name: "Bodyweight Lunge",
      muscles: ["Quadriceps", "Glutes", "Soleus", "Adductors", "Abductors"],
    },
    {
      name: "Bodyweight Plank",
      muscles: ["Abdominals", "Obliques", "Lower Back"],
    },
    {
      name: "Bench Press",
      muscles: ["Pecs", "Triceps", "Front Deltoids"],
    },
    {
      name: "Barbell Row",
      muscles: ["Lats", "Rear Deltoids", "Trapezius", "Pecs", "Forearms"],
    },
    {
      name: "Dumbbell Lateral Raise",
      muscles: ["Lateral Deltoids", "Front Deltoids", "Trapezius"],
    },
  ];

  await Promise.all(
    exercises.map(async ({ name, muscles }) => {
      try {
        const existingExercise = await prisma.exercise.findUnique({
          where: {
            name,
          },
        });
        if (!existingExercise) {
          const exc = await prisma.exercise.create({
            data: {
              name,
              muscles: {
                connectOrCreate: muscles.map((muscleName) => ({
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
      } catch (error) {
        console.error(error);
      }
    })
  );

  console.log("Excercices created: ", exercises.length);
}
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
