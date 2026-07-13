import { z } from "zod";

const departmentNames = z.enum(["EEE", "CSE", "CIVIL"], {
    errorMap: () => ({ message: "Department name must be one of: EEE, CSE, CIVIL" })
});

const createDepartment = z.object({
    name: departmentNames,
    code: z.string().min(1, "Department code is required"),
    profileImage: z.string().url().optional(),
});

const updateDepartment = z.object({
    name: departmentNames.optional(),
    code: z.string().optional(),
    profileImage: z.string().url().optional(),
});

export const DepartmentValidationSchema = {
    createDepartment,
    updateDepartment,
};