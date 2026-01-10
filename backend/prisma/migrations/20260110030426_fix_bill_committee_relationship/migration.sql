/*
  Warnings:

  - You are about to drop the column `legislativeSubjects` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `billId` on the `Committee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[billNumber,billType,congress]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,chamber]` on the table `Committee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'IN_COMMITTEE';
ALTER TYPE "Status" ADD VALUE 'OVERRIDE_VETO';

-- DropForeignKey
ALTER TABLE "Committee" DROP CONSTRAINT "Committee_billId_fkey";

-- DropIndex
DROP INDEX "Bill_billNumber_key";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "legislativeSubjects";

-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "billId";

-- CreateTable
CREATE TABLE "BillCommittee" (
    "committeeId" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "BillCommittee_pkey" PRIMARY KEY ("committeeId","billId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSubject" (
    "subjectsId" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "BillSubject_pkey" PRIMARY KEY ("subjectsId","billId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE INDEX "Bill_congress_idx" ON "Bill"("congress");

-- CreateIndex
CREATE INDEX "Bill_status_idx" ON "Bill"("status");

-- CreateIndex
CREATE INDEX "Bill_billType_idx" ON "Bill"("billType");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_billNumber_billType_congress_key" ON "Bill"("billNumber", "billType", "congress");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_chamber_key" ON "Committee"("name", "chamber");

-- AddForeignKey
ALTER TABLE "BillCommittee" ADD CONSTRAINT "BillCommittee_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillCommittee" ADD CONSTRAINT "BillCommittee_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSubject" ADD CONSTRAINT "BillSubject_subjectsId_fkey" FOREIGN KEY ("subjectsId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSubject" ADD CONSTRAINT "BillSubject_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
