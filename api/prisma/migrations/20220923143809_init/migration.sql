-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "intraId" TEXT,
    "displayname" TEXT DEFAULT 'anon',
    "username" TEXT NOT NULL,
    "picture" TEXT DEFAULT 'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    "status" TEXT DEFAULT 'offline',
    "wins" INTEGER DEFAULT 0,
    "losses" INTEGER DEFAULT 0,
    "twoFAEnabled" BOOLEAN DEFAULT false,
    "twoFASecret" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_intraId_key" ON "users"("intraId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_twoFASecret_key" ON "users"("twoFASecret");

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_sender_fkey" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
