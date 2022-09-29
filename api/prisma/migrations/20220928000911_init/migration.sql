-- CreateTable
CREATE TABLE "achievements" (
    "id" SERIAL NOT NULL,
    "firstWin" BOOLEAN NOT NULL DEFAULT false,
    "first5Wins" BOOLEAN NOT NULL DEFAULT false,
    "first10Wins" BOOLEAN NOT NULL DEFAULT false,
    "streak5Wins" BOOLEAN NOT NULL DEFAULT false,
    "streak5Losses" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "achievements_username_key" ON "achievements"("username");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
