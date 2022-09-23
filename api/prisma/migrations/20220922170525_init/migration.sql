-- AlterTable
CREATE SEQUENCE "users_intraid_seq";
ALTER TABLE "users" ALTER COLUMN "intraId" SET DEFAULT nextval('users_intraid_seq');
ALTER SEQUENCE "users_intraid_seq" OWNED BY "users"."intraId";
