/*
  Warnings:

  - The values [FAILED,IN_COMMITTEE,OVERRIDE_VETO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('INTRODUCED', 'PASSED_HOUSE', 'PASSED_SENATE', 'RESOLVING_DIFFERENCES', 'TO_PRESIDENT', 'VETOED', 'BECAME_LAW', 'FAILED_HOUSE', 'FAILED_SENATE');
ALTER TABLE "public"."Bill" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Bill" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Bill" ALTER COLUMN "status" SET DEFAULT 'INTRODUCED';
COMMIT;
