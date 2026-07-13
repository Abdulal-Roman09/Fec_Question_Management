/*
  Warnings:

  - Changed the type of `name` on the `departments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DepartmentName" AS ENUM ('EEE', 'CSE', 'CIVIL');

-- DropIndex
DROP INDEX "departments_name_key";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "name",
ADD COLUMN     "name" "DepartmentName" NOT NULL;
