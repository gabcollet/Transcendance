-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "winner" TEXT NOT NULL,
    "score1" INTEGER NOT NULL DEFAULT 0,
    "loser" TEXT NOT NULL,
    "score2" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_winner_fkey" FOREIGN KEY ("winner") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_loser_fkey" FOREIGN KEY ("loser") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
