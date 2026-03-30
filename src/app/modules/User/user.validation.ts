import { z } from "zod";

const createAdmin = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    admin: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().regex(/^\d{11}$/, "Phone must be 11 digits"),
        address: z.string().optional(),
        profileImage: z.string().url().optional(),
        designation: z.string().optional(),
        isActive: z.boolean().optional()
    })
});

const updateAdmin = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().regex(/^\d{11}$/).optional(),
    address: z.string().optional(),
    designation: z.string().optional(),
    isActive: z.boolean().optional(),
    profileImage: z.string().url("Profile image must be valid URL").optional()
});

const createStudent = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
    student: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().regex(/^\d{11}$/, "Phone must be 11 digits"),
        address: z.string().optional(),
        profileImage: z.string().url("Profile image must be valid URL"),
        studentId: z.string().min(3, "Student ID required"),
        batch: z.string().min(1, "Batch required"),
        semester: z.number().int().min(1).optional(),
        section: z.string().optional(),
        departmentId: z.string().uuid("Department ID must be valid UUID"),
        admissionDate: z.coerce.date().optional(),
        isActive: z.boolean().optional()
    })
});

const updateStudent = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().regex(/^\d{11}$/).optional(),
    address: z.string().optional(),
    profileImage: z.string().url().optional(),
    batch: z.string().optional(),
    semester: z.number().int().optional(),
    section: z.string().optional(),
    departmentId: z.string().uuid().optional(),
    isActive: z.boolean().optional()
});


export const userValidationSchema = {
    createAdmin,
    updateAdmin,
    createStudent,
    updateStudent
}