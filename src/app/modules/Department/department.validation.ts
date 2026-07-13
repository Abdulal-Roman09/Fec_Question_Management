import { z } from "zod";
import { DepartmentName } from "@prisma/client";

const createDepartment = z.object({
    name: z.enum(DepartmentName),
    code: z.string().trim().min(1, "Department code is required"),
    profileImage: z
        .string()
        .url("Profile image must be a valid URL")
        .optional(),
});

const updateDepartment = z.object({
    name: z.enum(DepartmentName).optional(),
    code: z
        .string()
        .trim()
        .min(1, "Department code cannot be empty")
        .optional(),
    profileImage: z
        .string()
        .url("Profile image must be a valid URL")
        .optional(),
});

export const DepartmentValidationSchema = {
    createDepartment,
    updateDepartment,
};