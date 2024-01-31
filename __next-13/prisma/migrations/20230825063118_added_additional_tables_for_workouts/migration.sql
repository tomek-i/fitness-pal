/*
  Warnings:

  - Added the required column `muscleGroup` to the `Excercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "duration" TEXT,
    "weight" TEXT,
    "reps" TEXT,
    "workoutId" INTEGER NOT NULL,
    CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "excersiceId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,
    CONSTRAINT "Workout_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Excercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Excercise" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Excercise";
DROP TABLE "Excercise";
ALTER TABLE "new_Excercise" RENAME TO "Excercise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
