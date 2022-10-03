/*
  Warnings:

  - The primary key for the `userchatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `userchatroom` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userchatroom" DROP CONSTRAINT "userchatroom_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "userchatroom_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "userchatroom_id_key" ON "userchatroom"("id");
