import { Meal } from "@prisma/client";
import { InvalidIdError } from "errors";

export class MealService {
  getAll(): Meal[] {
    return [];
  }
  get(id: number): Meal {
    return { id } as Meal;
  }

  create(meal: Meal): Meal {
    return {} as Meal;
  }
  update(meal: Meal) {
    if (!meal.id || meal.id <= 0) throw new InvalidIdError();
  }
  delete(id: number) {
    if (!id || id <= 0) throw new InvalidIdError();
  }
}
