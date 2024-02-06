/*
  Warnings:

  - You are about to drop the column `userId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ExerciseRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WeightRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ExercisePlan` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `NutritionInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ExerciseRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Muscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `WeightRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ExercisePlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "Meal_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meal" ("calories", "created_at", "fitnessDataId", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at") SELECT "calories", "created_at", "fitnessDataId", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
CREATE TABLE "new_NutritionInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "mealId" INTEGER NOT NULL,
    "nutritionId" INTEGER NOT NULL,
    CONSTRAINT "NutritionInfo_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NutritionInfo_nutritionId_fkey" FOREIGN KEY ("nutritionId") REFERENCES "Nutrition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NutritionInfo" ("amount", "id", "mealId", "nutritionId") SELECT "amount", "id", "mealId", "nutritionId" FROM "NutritionInfo";
DROP TABLE "NutritionInfo";
ALTER TABLE "new_NutritionInfo" RENAME TO "NutritionInfo";
CREATE TABLE "new_ExerciseRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "ExerciseRecord_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseRecord_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseRecord" ("day", "exerciseId", "fitnessDataId", "id", "repetitions", "sets") SELECT "day", "exerciseId", "fitnessDataId", "id", "repetitions", "sets" FROM "ExerciseRecord";
DROP TABLE "ExerciseRecord";
ALTER TABLE "new_ExerciseRecord" RENAME TO "ExerciseRecord";
CREATE TABLE "new_Muscle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "excerciseId" INTEGER,
    CONSTRAINT "Muscle_excerciseId_fkey" FOREIGN KEY ("excerciseId") REFERENCES "Exercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Muscle" ("excerciseId", "id", "name") SELECT "excerciseId", "id", "name" FROM "Muscle";
DROP TABLE "Muscle";
ALTER TABLE "new_Muscle" RENAME TO "Muscle";
CREATE UNIQUE INDEX "Muscle_name_key" ON "Muscle"("name");
CREATE TABLE "new_Profile" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "age" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "height" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("age", "height", "name", "userId", "weight") SELECT "age", "height", "name", "userId", "weight" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_WeightRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "WeightRecord_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WeightRecord" ("date", "fitnessDataId", "id", "weight") SELECT "date", "fitnessDataId", "id", "weight" FROM "WeightRecord";
DROP TABLE "WeightRecord";
ALTER TABLE "new_WeightRecord" RENAME TO "WeightRecord";
CREATE TABLE "new_Nutrition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Nutrition" ("id", "name") SELECT "id", "name" FROM "Nutrition";
DROP TABLE "Nutrition";
ALTER TABLE "new_Nutrition" RENAME TO "Nutrition";
CREATE TABLE "new_ExercisePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "ExercisePlan_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExercisePlan_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExercisePlan" ("day", "exerciseId", "fitnessDataId", "id", "repetitions", "sets") SELECT "day", "exerciseId", "fitnessDataId", "id", "repetitions", "sets" FROM "ExercisePlan";
DROP TABLE "ExercisePlan";
ALTER TABLE "new_ExercisePlan" RENAME TO "ExercisePlan";
CREATE TABLE "new_Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "excersiceId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "routineId" INTEGER NOT NULL,
    CONSTRAINT "Workout_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Workout" ("excersiceId", "id", "routineId") SELECT "excersiceId", "id", "routineId" FROM "Workout";
DROP TABLE "Workout";
ALTER TABLE "new_Workout" RENAME TO "Workout";
CREATE TABLE "new_Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "duration" TEXT,
    "weight" TEXT,
    "reps" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "workoutId" INTEGER NOT NULL,
    CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("duration", "id", "reps", "weight", "workoutId") SELECT "duration", "id", "reps", "weight", "workoutId" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
