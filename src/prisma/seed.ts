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

  console.log("Users created:", { admin });

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
        if (!existingExercise)
          await prisma.exercise.create({
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
