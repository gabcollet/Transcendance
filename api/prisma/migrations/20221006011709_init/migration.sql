/*
  Warnings:

  - A unique constraint covering the columns `[displayname]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "displayname" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_displayname_key" ON "users"("displayname");
