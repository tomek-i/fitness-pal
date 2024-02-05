ALTER TABLE "Excercise" RENAME TO "Exercise";
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");