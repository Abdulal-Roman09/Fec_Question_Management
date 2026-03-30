import bcrypt from "bcryptjs";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { UserRole } from "@prisma/client";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";
import { userValidationSchema } from "./user.validation";

const createAdmin = async (payload: any, file?: Express.Multer.File) => {
    if (file) {
        const upload = await sendToCloudinary(file);
        payload.admin.profileImage = upload?.secure_url;
    }

    const validatedData = userValidationSchema.createAdmin.parse(payload);

    const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
    });
    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(validatedData.password, Number(config.saltRound));

    const userData = {
        email: validatedData.email,
        password: hashedPassword,
        role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({ data: userData });

        const admin = await tx.admin.create({
            data: {
                email: user.email,
                ...validatedData.admin,
            },
        });

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: admin.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            admin: {
                name: admin.name,
                phone: admin.phone,
                address: admin.address,
                profileImage: admin.profileImage,
                designation: admin.designation,
            },
        };
    });

    return result;
};

const createStudent = async (payload: any, file?: Express.Multer.File) => {
    let profileImage = "";

    if (file) {
        const upload = await sendToCloudinary(file);
        profileImage = upload?.secure_url;
    }

    const validatedData = userValidationSchema.createStudent.parse(payload);

    const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
    });

    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(
        validatedData.password,
        Number(config.saltRound)
    );

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                role: UserRole.STUDENT,
            },
        });

        const student = await tx.student.create({
            data: {
                ...validatedData.student,
                email: user.email,
                ...(profileImage && { profileImage }),
            },
        });

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            student: {
                name: student.name,
                phone: student.phone,
                address: student.address || null,
                profileImage: student.profileImage || null,
                studentId: student.studentId,
                batch: student.batch,
                semester: student.semester ?? null,
                section: student.section || null,
                departmentId: student.departmentId,
                admissionDate: student.admissionDate ?? null,
                isActive: student.isActive ?? true,
            },
        };
    });

    return result;
};
export const UserService = {
    createAdmin,
    createStudent,
};