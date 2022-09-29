/*
  Warnings:

  - Added the required column `admin` to the `chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatroom" ADD COLUMN     "admin" TEXT NOT NULL;
