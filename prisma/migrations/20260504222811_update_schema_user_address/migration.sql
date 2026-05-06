/*
  Warnings:

  - You are about to drop the column `address` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "address",
ADD COLUMN     "addressLine1" TEXT NOT NULL,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
