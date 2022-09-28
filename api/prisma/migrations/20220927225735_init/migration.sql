/*
  Warnings:

  - You are about to drop the column `losses` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "losses",
DROP COLUMN "wins";

-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "wins" INTEGER DEFAULT 0,
    "losses" INTEGER DEFAULT 0,
    "ratio" INTEGER DEFAULT 0,
    "winningStreak" INTEGER DEFAULT 0,
    "losingStreak" INTEGER DEFAULT 0,
    "username" TEXT NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
