/*
  Warnings:

  - Changed the type of `code` on the `departments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `departments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DepartmentCode" AS ENUM ('EEE', 'CSE', 'CIVIL');

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "code",
ADD COLUMN     "code" "DepartmentCode" NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DepartmentName";

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");
