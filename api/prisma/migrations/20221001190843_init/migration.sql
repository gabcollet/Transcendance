/*
  Warnings:

  - You are about to drop the `_ChatroomToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `chatroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_B_fkey";

-- DropTable
DROP TABLE "_ChatroomToUser";

-- CreateTable
CREATE TABLE "UserChatroom" (
    "chatroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserChatroom_pkey" PRIMARY KEY ("chatroomId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_id_key" ON "chatroom"("id");

-- AddForeignKey
ALTER TABLE "UserChatroom" ADD CONSTRAINT "UserChatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChatroom" ADD CONSTRAINT "UserChatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
