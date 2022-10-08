-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "intraId" TEXT,
    "displayname" TEXT,
    "username" TEXT NOT NULL,
    "picture" TEXT DEFAULT 'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    "status" TEXT DEFAULT 'offline',
    "twoFAEnabled" BOOLEAN DEFAULT false,
    "twoFASecret" TEXT,
    "socketID" TEXT DEFAULT 'no ID',
    "blockedUsernames" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "wins" INTEGER DEFAULT 0,
    "losses" INTEGER DEFAULT 0,
    "netWins" INTEGER DEFAULT 0,
    "rank" INTEGER DEFAULT 0,
    "winningStreak" INTEGER DEFAULT 0,
    "losingStreak" INTEGER DEFAULT 0,
    "username" TEXT NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "winner" TEXT NOT NULL,
    "score1" INTEGER NOT NULL DEFAULT 0,
    "loser" TEXT NOT NULL,
    "score2" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "messageText" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userchatroom" (
    "id" SERIAL NOT NULL,
    "chatroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "joined" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "muted" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userchatroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "id" SERIAL NOT NULL,
    "channelName" TEXT NOT NULL,
    "protected" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "isDM" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_intraId_key" ON "users"("intraId");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayname_key" ON "users"("displayname");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_twoFASecret_key" ON "users"("twoFASecret");

-- CreateIndex
CREATE UNIQUE INDEX "users_blockedUsernames_key" ON "users"("blockedUsernames");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_username_key" ON "achievements"("username");

-- CreateIndex
CREATE UNIQUE INDEX "stats_username_key" ON "stats"("username");

-- CreateIndex
CREATE UNIQUE INDEX "friendships_sender_receiver_key" ON "friendships"("sender", "receiver");

-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userchatroom_id_key" ON "userchatroom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_id_key" ON "chatroom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_winner_fkey" FOREIGN KEY ("winner") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_loser_fkey" FOREIGN KEY ("loser") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_sender_fkey" FOREIGN KEY ("sender") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userchatroom" ADD CONSTRAINT "userchatroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
