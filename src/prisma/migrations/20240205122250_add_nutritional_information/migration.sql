/*
  Warnings:

  - Added the required column `macronutrientsId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `micronutrientsId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WeightRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "WeightRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Macronutrients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carbs" REAL NOT NULL,
    "dietaryFibers" REAL NOT NULL,
    "sugars" REAL NOT NULL,
    "starch" REAL NOT NULL,
    "totalFat" REAL NOT NULL,
    "saturatedFat" REAL NOT NULL,
    "polyunsaturatedFat" REAL NOT NULL,
    "monounsaturatedFat" REAL NOT NULL,
    "transFat" REAL NOT NULL,
    "protein" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Micronutrients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cholesterol" REAL NOT NULL,
    "sodium" REAL NOT NULL,
    "potassium" REAL NOT NULL
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
    "macronutrientsId" INTEGER NOT NULL,
    "micronutrientsId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meal_macronutrientsId_fkey" FOREIGN KEY ("macronutrientsId") REFERENCES "Macronutrients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meal_micronutrientsId_fkey" FOREIGN KEY ("micronutrientsId") REFERENCES "Micronutrients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meal" ("calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "updated_at") SELECT "calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "updated_at" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
