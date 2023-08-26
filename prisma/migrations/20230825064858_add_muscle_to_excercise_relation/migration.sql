/*
  Warnings:

  - You are about to drop the column `muscleGroup` on the `Excercise` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Excercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Excercise" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Excercise";
DROP TABLE "Excercise";
ALTER TABLE "new_Excercise" RENAME TO "Excercise";
CREATE UNIQUE INDEX "Excercise_name_key" ON "Excercise"("name");
CREATE TABLE "new_Muscle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "excerciseId" INTEGER,
    CONSTRAINT "Muscle_excerciseId_fkey" FOREIGN KEY ("excerciseId") REFERENCES "Excercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Muscle" ("id", "name") SELECT "id", "name" FROM "Muscle";
DROP TABLE "Muscle";
ALTER TABLE "new_Muscle" RENAME TO "Muscle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
