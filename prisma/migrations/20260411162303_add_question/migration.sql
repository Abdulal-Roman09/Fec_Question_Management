-- CreateTable
CREATE TABLE "QuestionSet" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "questionImage" TEXT,
    "questionFile" TEXT,
    "examTitle" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "courseCode" TEXT,
    "examDate" TIMESTAMP(3),
    "duration" INTEGER,
    "batch" TEXT NOT NULL,
    "semester" INTEGER,
    "section" TEXT,
    "year" INTEGER,
    "session" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionSet" ADD CONSTRAINT "QuestionSet_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSet" ADD CONSTRAINT "QuestionSet_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
