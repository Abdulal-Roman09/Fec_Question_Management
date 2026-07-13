import { z } from "zod";
import { DepartmentCode } from "@prisma/client";

const createDepartment = z.object({
  name: z.string().trim().min(1, "Department name is required"),

  code: z.enum(DepartmentCode),

  profileImage: z
    .string()
    .url("Profile image must be a valid URL")
    .optional(),
});

const updateDepartment = z.object({
  name: z.string().trim().min(1).optional(),

  code: z.enum(DepartmentCode).optional(),

  profileImage: z
    .string()
    .url("Profile image must be a valid URL")
    .optional(),
});

export const DepartmentValidationSchema = {
  createDepartment,
  updateDepartment,
};