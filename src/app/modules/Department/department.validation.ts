import { z } from "zod";

const createDepartment = z.object({
    name: z.string().min(2, "Department name is required"),
    code: z.string().min(1, "Department code is required"),
    profileImage: z.string().url().optional(),
});

const updateDepartment = z.object({
    name: z.string().min(2).optional(),
    code: z.string().optional(),
    profileImage: z.string().url().optional(),
});

export const DepartmentValidationSchema = {
    createDepartment,
    updateDepartment,
};