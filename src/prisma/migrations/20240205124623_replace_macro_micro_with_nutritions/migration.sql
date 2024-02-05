/*
  Warnings:

  - You are about to drop the `Macronutrients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Micronutrients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `macronutrientsId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `micronutrientsId` on the `Meal` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Macronutrients";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Micronutrients";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Nutrition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NutritionInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "nutritionId" INTEGER NOT NULL,
    CONSTRAINT "NutritionInfo_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NutritionInfo_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "time" DATETIME NOT NULL,
    "servingSize" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "calories" REAL NOT NULL,
    "mealType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meal" ("calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at", "userId") SELECT "calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at", "userId" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
