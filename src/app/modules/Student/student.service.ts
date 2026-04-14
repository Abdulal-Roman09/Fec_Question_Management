import { Status } from "@prisma/client";
import prisma from "../../../shared/prisma";


const getAllFromDB = async () => {
    const result = await prisma.student.findMany({
        include: {
            user: true,
            department: true
        }
    });
    return result;
};

const deleteFromDB = async (id: string) => {
    const result = await prisma.$transaction(async (tx) => {

        const studentData = await tx.student.findUnique({
            where: { id }
        });

        if (!studentData) {
            throw new Error("Student not found");
        }

        await tx.student.delete({
            where: { id }
        });

        await tx.user.delete({
            where: { email: studentData.email }
        });

        return { message: "Student & User deleted successfully" };
    });

    return result;
};

const softDeleteFromDB = async (id: string) => {
    return await prisma.$transaction(async (tx) => {

        const studentData = await tx.student.findUnique({
            where: { id },
        });

        if (!studentData) {
            throw new Error("Student not found");
        }

        await tx.student.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        await tx.user.update({
            where: { id: studentData.id },
            data: {
                status: Status.DELETED,
            },
        });

        return { message: "Student & User soft deleted successfully" };
    });
};

export const StudentService = {
    getAllFromDB,
    deleteFromDB,
    softDeleteFromDB
};