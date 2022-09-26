-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_receiver_fkey";

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_sender_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "intraId" DROP DEFAULT,
ALTER COLUMN "intraId" SET DATA TYPE TEXT;
DROP SEQUENCE "users_intraid_seq";

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_sender_fkey" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
