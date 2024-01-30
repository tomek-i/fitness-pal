/*
  Warnings:

  - Added the required column `mealType` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servings` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "servingSize" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "calories" REAL NOT NULL,
    "notes" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Meal" ("calories", "created_at", "id", "name", "notes", "servingSize", "updated_at") SELECT "calories", "created_at", "id", "name", "notes", "servingSize", "updated_at" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
