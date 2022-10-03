/*
  Warnings:

  - You are about to drop the column `admin` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `chatroom` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `authorUID` on the `message` table. All the data in the column will be lost.
  - Added the required column `adminID` to the `chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelName` to the `chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDM` to the `chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `private` to the `chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatroom" DROP COLUMN "admin",
DROP COLUMN "name",
DROP COLUMN "visibility",
ADD COLUMN     "adminID" INTEGER NOT NULL,
ADD COLUMN     "channelName" TEXT NOT NULL,
ADD COLUMN     "isDM" BOOLEAN NOT NULL,
ADD COLUMN     "private" BOOLEAN NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "message" DROP COLUMN "author",
DROP COLUMN "authorUID",
ADD COLUMN     "authorID" INTEGER NOT NULL,
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_mute" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ChatroomToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_blacklist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_mute_AB_unique" ON "_mute"("A", "B");

-- CreateIndex
CREATE INDEX "_mute_B_index" ON "_mute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatroomToUser_AB_unique" ON "_ChatroomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatroomToUser_B_index" ON "_ChatroomToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blacklist_AB_unique" ON "_blacklist"("A", "B");

-- CreateIndex
CREATE INDEX "_blacklist_B_index" ON "_blacklist"("B");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mute" ADD CONSTRAINT "_mute_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mute" ADD CONSTRAINT "_mute_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD CONSTRAINT "_ChatroomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD CONSTRAINT "_ChatroomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blacklist" ADD CONSTRAINT "_blacklist_A_fkey" FOREIGN KEY ("A") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blacklist" ADD CONSTRAINT "_blacklist_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
