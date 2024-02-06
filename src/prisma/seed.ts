import { Prisma, PrismaClient } from "@prisma/client";
import { insertSeedDataForUser } from "./data";
import { insertExerciseData } from "./data/exercises";
const prisma = new PrismaClient();

async function main() {
  const admin = await upsertUser({
    email: "admin@example.com",
    password: "admin",
    Profile: {
      create: {
        name: "Admin",
      },
    },
  });

  const user = await upsertUser({
    email: "john.doe@example.com",
    password: "password",
    Profile: {
      create: {
        name: "John Doe",
      },
    },
  });

  console.log("Users created:", { admin, user });

  insertExerciseData(prisma);
  insertSeedDataForUser(prisma, user);
}

async function upsertUser(user: Prisma.UserCreateInput) {
  return prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
