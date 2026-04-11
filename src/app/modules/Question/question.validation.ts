import { z } from "zod";

const createQuestion = z.object({
    name: z.string().min(2, "Question name is required"),
    code: z.string().min(1, "Question code is required"),
    profileImage: z.string().url().optional(),
});

const updateQuestion = z.object({
    name: z.string().min(2).optional(),
    code: z.string().optional(),
    profileImage: z.string().url().optional(),
});

export const QuestionValidationSchema = {
    createQuestion,
    updateQuestion,
};