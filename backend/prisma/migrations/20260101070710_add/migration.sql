/*
  Warnings:

  - You are about to drop the `BillsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BillsOnUsers" DROP CONSTRAINT "BillsOnUsers_billId_fkey";

-- DropForeignKey
ALTER TABLE "BillsOnUsers" DROP CONSTRAINT "BillsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "relevancy" DOUBLE PRECISION;

-- DropTable
DROP TABLE "BillsOnUsers";

-- CreateTable
CREATE TABLE "UserBill" (
    "userId" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBill_pkey" PRIMARY KEY ("userId","billId")
);

-- AddForeignKey
ALTER TABLE "UserBill" ADD CONSTRAINT "UserBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBill" ADD CONSTRAINT "UserBill_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
