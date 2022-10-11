/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `userchatroom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userchatroom" DROP COLUMN "timeStamp";

-- CreateTable
CREATE TABLE "restricted" (
    "id" SERIAL NOT NULL,
    "userChatroomChatroomId" INTEGER NOT NULL,
    "userChatroomUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,

    CONSTRAINT "restricted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restricted_userChatroomChatroomId_key" ON "restricted"("userChatroomChatroomId");

-- CreateIndex
CREATE UNIQUE INDEX "restricted_userChatroomUserId_key" ON "restricted"("userChatroomUserId");

-- CreateIndex
CREATE UNIQUE INDEX "restricted_userChatroomChatroomId_userChatroomUserId_key" ON "restricted"("userChatroomChatroomId", "userChatroomUserId");

-- AddForeignKey
ALTER TABLE "restricted" ADD CONSTRAINT "restricted_userChatroomChatroomId_userChatroomUserId_fkey" FOREIGN KEY ("userChatroomChatroomId", "userChatroomUserId") REFERENCES "userchatroom"("chatroomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
