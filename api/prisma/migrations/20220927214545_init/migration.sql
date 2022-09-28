/*
  Warnings:

  - A unique constraint covering the columns `[sender]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiver]` on the table `friendships` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friendships_sender_key" ON "friendships"("sender");

-- CreateIndex
CREATE UNIQUE INDEX "friendships_receiver_key" ON "friendships"("receiver");
