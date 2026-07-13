import { z } from "zod";
import { DepartmentName } from "@prisma/client";

const createDepartment = z.object({
    name: z.nativeEnum(DepartmentName, {
        message: "Department name must be one of: EEE, CSE, CIVIL"
    }),
    code: z.string().min(1, "Department code is required"),
    profileImage: z.string().url().optional(),
});

const updateDepartment = z.object({
    name: z.nativeEnum(DepartmentName, {
        message: "Department name must be one of: EEE, CSE, CIVIL"
    }).optional(),
    code: z.string().optional(),
    profileImage: z.string().url().optional(),
});

export const DepartmentValidationSchema = {
    createDepartment,
    updateDepartment,
};