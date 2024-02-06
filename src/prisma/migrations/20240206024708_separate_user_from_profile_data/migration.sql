/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "FitnessData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "FitnessData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "age" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "height" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExercisePlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "ExercisePlan_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExercisePlan_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExercisePlan" ("day", "exerciseId", "id", "repetitions", "sets", "userId") SELECT "day", "exerciseId", "id", "repetitions", "sets", "userId" FROM "ExercisePlan";
DROP TABLE "ExercisePlan";
ALTER TABLE "new_ExercisePlan" RENAME TO "ExercisePlan";
CREATE TABLE "new_WeightRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "WeightRecord_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WeightRecord" ("date", "id", "userId", "weight") SELECT "date", "id", "userId", "weight" FROM "WeightRecord";
DROP TABLE "WeightRecord";
ALTER TABLE "new_WeightRecord" RENAME TO "WeightRecord";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("created_at", "email", "id", "updated_at") SELECT "created_at", "email", "id", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
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
    "fitnessDataId" INTEGER,
    CONSTRAINT "Meal_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meal" ("calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at", "userId") SELECT "calories", "created_at", "id", "mealType", "name", "notes", "servingSize", "servings", "time", "updated_at", "userId" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
CREATE TABLE "new_ExerciseRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "fitnessDataId" INTEGER,
    CONSTRAINT "ExerciseRecord_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseRecord_fitnessDataId_fkey" FOREIGN KEY ("fitnessDataId") REFERENCES "FitnessData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseRecord" ("day", "exerciseId", "id", "repetitions", "sets", "userId") SELECT "day", "exerciseId", "id", "repetitions", "sets", "userId" FROM "ExerciseRecord";
DROP TABLE "ExerciseRecord";
ALTER TABLE "new_ExerciseRecord" RENAME TO "ExerciseRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
