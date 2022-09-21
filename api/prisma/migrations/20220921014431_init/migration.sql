-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "intraId" INTEGER,
    "displayname" TEXT DEFAULT 'anon',
    "username" TEXT NOT NULL,
    "picture" TEXT DEFAULT 'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    "status" TEXT DEFAULT 'offline',
    "wins" INTEGER DEFAULT 0,
    "losses" INTEGER DEFAULT 0,
    "twoFAEnabled" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
