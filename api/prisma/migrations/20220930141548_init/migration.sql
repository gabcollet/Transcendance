/*
  Warnings:

  - You are about to drop the column `message` on the `message` table. All the data in the column will be lost.
  - Added the required column `authorUID` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageText` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "message",
ADD COLUMN     "authorUID" TEXT NOT NULL,
ADD COLUMN     "messageText" TEXT NOT NULL,
ADD COLUMN     "roomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
