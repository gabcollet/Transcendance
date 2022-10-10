-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_authorID_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "userchatroom" DROP CONSTRAINT "userchatroom_userId_fkey";

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
