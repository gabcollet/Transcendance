-- DropForeignKey
ALTER TABLE "restricted" DROP CONSTRAINT "restricted_restrictionRoomId_restrictionUserId_fkey";

-- AddForeignKey
ALTER TABLE "restricted" ADD CONSTRAINT "restricted_restrictionRoomId_restrictionUserId_fkey" FOREIGN KEY ("restrictionRoomId", "restrictionUserId") REFERENCES "userchatroom"("chatroomId", "userId") ON DELETE CASCADE ON UPDATE CASCADE;
