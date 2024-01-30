import { Meal } from "@prisma/client";

export const mealData: Meal[] = [
  {
    id: 1,
    calories: 100,
    name: "Garlic and Herb Chicken",
    // brand: "My Muscle Chef"
    notes: "",
    mealType: "Breakfast",
    servings: 1,
    servingSize: "300 g",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];
