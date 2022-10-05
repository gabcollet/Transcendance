/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");
