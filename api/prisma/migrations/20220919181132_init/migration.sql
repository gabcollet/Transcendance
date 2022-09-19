-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "intraId" INTEGER NOT NULL,
    "displayname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "twoFAEnabled" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
