-- CreateEnum
CREATE TYPE "public"."SponsorRole" AS ENUM ('SPONSOR', 'COSPONSOR');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('INTRODUCED', 'PASSED_HOUSE', 'PASSED_SENATE', 'TO_PRESIDENT', 'VETOED', 'OVERRIDDEN', 'BECAME_LAW', 'FAILED');

-- CreateTable
CREATE TABLE "public"."Bill" (
    "id" TEXT NOT NULL,
    "billNumber" INTEGER NOT NULL,
    "billType" TEXT NOT NULL,
    "congress" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'INTRODUCED',
    "introducedDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT,
    "updateDate" TIMESTAMP(3),
    "policyArea" TEXT NOT NULL,
    "legislativeSubjects" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Action" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "latestAction" TEXT NOT NULL,
    "actionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sponsor" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "party" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT,
    "role" "public"."SponsorRole" NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Committee" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chamber" TEXT NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_billNumber_key" ON "public"."Bill"("billNumber");

-- AddForeignKey
ALTER TABLE "public"."Action" ADD CONSTRAINT "Action_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sponsor" ADD CONSTRAINT "Sponsor_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Committee" ADD CONSTRAINT "Committee_billId_fkey" FOREIGN KEY ("billId") REFERENCES "public"."Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
