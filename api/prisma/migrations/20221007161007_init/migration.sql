/*
  Warnings:

  - You are about to drop the `_blacklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_mute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_blacklist" DROP CONSTRAINT "_blacklist_A_fkey";

-- DropForeignKey
ALTER TABLE "_blacklist" DROP CONSTRAINT "_blacklist_B_fkey";

-- DropForeignKey
ALTER TABLE "_mute" DROP CONSTRAINT "_mute_A_fkey";

-- DropForeignKey
ALTER TABLE "_mute" DROP CONSTRAINT "_mute_B_fkey";

-- AlterTable
ALTER TABLE "userchatroom" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "joined" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_blacklist";

-- DropTable
DROP TABLE "_mute";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
