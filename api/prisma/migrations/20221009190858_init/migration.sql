/*
  Warnings:

  - The primary key for the `userchatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userchatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chatroomId,userId]` on the table `userchatroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "userchatroom" DROP CONSTRAINT "userchatroom_chatroomId_fkey";

-- DropIndex
DROP INDEX "userchatroom_id_key";

-- AlterTable
ALTER TABLE "userchatroom" DROP CONSTRAINT "userchatroom_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "userchatroom_chatroomId_userId_key" ON "userchatroom"("chatroomId", "userId");

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
