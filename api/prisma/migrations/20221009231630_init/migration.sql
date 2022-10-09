-- DropForeignKey
ALTER TABLE "userchatroom" DROP CONSTRAINT "userchatroom_chatroomId_fkey";

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
