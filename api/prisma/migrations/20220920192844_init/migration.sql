/*
  Warnings:

  - The `twoFAEnabled` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "displayname" SET DEFAULT 'anon',
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "picture" SET DEFAULT 'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
ALTER COLUMN "status" SET DEFAULT 'offline',
ALTER COLUMN "wins" SET DEFAULT 0,
ALTER COLUMN "losses" SET DEFAULT 0,
DROP COLUMN "twoFAEnabled",
ADD COLUMN     "twoFAEnabled" BOOLEAN DEFAULT false;
