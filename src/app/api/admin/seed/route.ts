export async function POST() {
  // Creating sample users
  const user1 = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-01"),
      gender: "Male",
      height: 180,
      weight: 80,
      profilePictureUrl: "https://example.com/profile.jpg",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-01"),
      gender: "Female",
      height: 160,
      weight: 45,
      profilePictureUrl: "https://example.com/profile.jpg",
    },
  });

  console.log({ user1, user2 });

  const group = await prisma.muscleGroup.create({
    data: {
      name: "Arms",
      imageUrl: "https://example.com/arms.jpg",
    },
  });

  await prisma.muscle.create({
    data: {
      name: "Biceps",
      imageUrl: "https://example.com/bicep.jpg",
      muscleGroup: {
        connect: {
          id: group.id,
        },
      },
    },
  });

  await prisma.muscle.create({
    data: {
      name: "Triceps",
      imageUrl: "https://example.com/triceps.jpg",
      muscleGroup: {
        connect: {
          id: group.id,
        },
      },
    },
  });

  const excercise1 = await prisma.exercise.create({
    data: {
      name: "Bicep Curl",
      category: "Strength",
      muscles: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
  });

  return Response.json({
    hello: "world",
  });
}
