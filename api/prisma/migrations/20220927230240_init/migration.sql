/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `stats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stats_username_key" ON "stats"("username");
