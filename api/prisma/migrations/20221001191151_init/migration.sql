/*
  Warnings:

  - You are about to drop the `UserChatroom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChatroom" DROP CONSTRAINT "UserChatroom_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "UserChatroom" DROP CONSTRAINT "UserChatroom_userId_fkey";

-- DropTable
DROP TABLE "UserChatroom";

-- CreateTable
CREATE TABLE "userchatroom" (
    "chatroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userchatroom_pkey" PRIMARY KEY ("chatroomId","userId")
);

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
