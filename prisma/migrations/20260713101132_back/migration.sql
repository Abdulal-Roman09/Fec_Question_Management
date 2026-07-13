/*
  Warnings:

  - Changed the type of `code` on the `departments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "departments" DROP COLUMN "code",
ADD COLUMN     "code" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DepartmentCode";

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");
