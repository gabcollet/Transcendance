-- DropForeignKey
ALTER TABLE "achievements" DROP CONSTRAINT "achievements_username_fkey";

-- DropForeignKey
ALTER TABLE "stats" DROP CONSTRAINT "stats_username_fkey";

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
