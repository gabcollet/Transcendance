/*
  Warnings:

  - A unique constraint covering the columns `[sender,receiver]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "friendships_receiver_key";

-- DropIndex
DROP INDEX "friendships_sender_key";

-- CreateIndex
CREATE UNIQUE INDEX "friendships_sender_receiver_key" ON "friendships"("sender", "receiver");
