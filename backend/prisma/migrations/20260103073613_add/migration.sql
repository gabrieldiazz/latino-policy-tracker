/*
  Warnings:

  - The values [OVERRIDDEN] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `latestAction` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `billId` on the `Sponsor` table. All the data in the column will be lost.
  - Added the required column `text` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('INTRODUCED', 'PASSED_HOUSE', 'PASSED_SENATE', 'TO_PRESIDENT', 'VETOED', 'RESOLVING_DIFFERENCES', 'BECAME_LAW', 'FAILED');
ALTER TABLE "public"."Bill" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Bill" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Bill" ALTER COLUMN "status" SET DEFAULT 'INTRODUCED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Sponsor" DROP CONSTRAINT "Sponsor_billId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "latestAction",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "billId";

-- CreateTable
CREATE TABLE "BillSponsor" (
    "sponsorId" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "BillSponsor_pkey" PRIMARY KEY ("sponsorId","billId")
);

-- AddForeignKey
ALTER TABLE "BillSponsor" ADD CONSTRAINT "BillSponsor_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSponsor" ADD CONSTRAINT "BillSponsor_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
