import { z } from "zod";

const createQuestion = z.object({
    // relation ids
    studentId: z.string().uuid("Invalid student ID"),
    departmentId: z.string().uuid("Invalid department ID"),

    // files
    questionImage: z.string().url("Invalid image URL").optional(),
    questionFile: z.string().url("Invalid file URL").optional(),

    // Exam Information
    examTitle: z.string().min(2, "Exam title is required"),
    subject: z.string().min(2, "Subject is required"),
    courseCode: z.string().optional(),
    examDate: z.coerce.date().optional(),
    duration: z.number().int().positive("Number is reuired"),

    // Academic Info
    batch: z.string().min(1, "Batch is required"),
    semester: z.number().int().positive().optional(),
    section: z.string().optional(),
    year: z.number().int().optional(),
    session: z.string().optional(),
});

const updateQuestion = z.object({
    // relation ids
    studentId: z.string().uuid().optional(),
    departmentId: z.string().uuid().optional(),

    // files
    questionImage: z.string().url().optional(),
    questionFile: z.string().url().optional(),

    // Exam Information
    examTitle: z.string().min(2).optional(),
    subject: z.string().min(2).optional(),
    courseCode: z.string().optional(),
    examDate: z.coerce.date().optional(),
    duration: z.number().int().positive().optional(),

    // Academic Info
    batch: z.string().optional(),
    semester: z.number().int().optional(),
    section: z.string().optional(),
    year: z.number().int().optional(),
    session: z.string().optional(),
});

export const QuestionValidationSchema = {
    createQuestion,
    updateQuestion,
};