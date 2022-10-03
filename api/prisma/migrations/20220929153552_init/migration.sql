-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "protected" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id")
);
