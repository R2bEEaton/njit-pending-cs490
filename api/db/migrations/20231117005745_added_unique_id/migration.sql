/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_userId_date_key" ON "Task"("userId", "date");
