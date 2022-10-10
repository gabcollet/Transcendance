/*
  Warnings:

  - You are about to drop the column `userChatroomChatroomId` on the `restricted` table. All the data in the column will be lost.
  - You are about to drop the column `userChatroomUserId` on the `restricted` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restrictionRoomId]` on the table `restricted` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restrictionUserId]` on the table `restricted` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restrictionRoomId,restrictionUserId]` on the table `restricted` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restrictionRoomId` to the `restricted` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restrictionUserId` to the `restricted` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restricted" DROP CONSTRAINT "restricted_userChatroomChatroomId_userChatroomUserId_fkey";

-- DropIndex
DROP INDEX "restricted_userChatroomChatroomId_key";

-- DropIndex
DROP INDEX "restricted_userChatroomChatroomId_userChatroomUserId_key";

-- DropIndex
DROP INDEX "restricted_userChatroomUserId_key";

-- AlterTable
ALTER TABLE "restricted" DROP COLUMN "userChatroomChatroomId",
DROP COLUMN "userChatroomUserId",
ADD COLUMN     "restrictionRoomId" INTEGER NOT NULL,
ADD COLUMN     "restrictionUserId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restricted_restrictionRoomId_key" ON "restricted"("restrictionRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "restricted_restrictionUserId_key" ON "restricted"("restrictionUserId");

-- CreateIndex
CREATE UNIQUE INDEX "restricted_restrictionRoomId_restrictionUserId_key" ON "restricted"("restrictionRoomId", "restrictionUserId");

-- AddForeignKey
ALTER TABLE "restricted" ADD CONSTRAINT "restricted_restrictionRoomId_restrictionUserId_fkey" FOREIGN KEY ("restrictionRoomId", "restrictionUserId") REFERENCES "userchatroom"("chatroomId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
