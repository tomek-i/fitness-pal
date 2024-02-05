import { PrismaClient } from "@prisma/client";

export async function insertExerciseData(prisma: PrismaClient) {
  const exercises = [
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
        }
      } catch (error) {
        console.error(error);
      }
    })
  );

  console.log("Excercices created: ", exercises.length);
}
