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

  const excercises = [
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
    excercises.map(async ({ name, muscles }) => {
      try {
        await prisma.excercise.create({
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

  console.log("Excercices created: ", excercises.length);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
