import prisma from "../../../shared/prisma";
import { ICloudinaryResponse } from "../../../interface/file";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";

const createDepartment = async (payload: { name: string; code: string }, file?: ICloudinaryResponse) => {
    let profileImage = "";

    if (file) {
        const upload = await sendToCloudinary(file);
        profileImage = upload?.secure_url;
    }

    const existingDepartment = await prisma.department.findFirst({
        where: {
            OR: [
                { name: payload.name },
                { code: payload.code.toUpperCase() },
            ],
        },
    });

    if (existingDepartment) {
        throw new Error("Department already exists");
    }

    const upperCaseDepartmentCode = payload.code.toUpperCase();

    const result = await prisma.department.create({
        data: {
            name: payload.name,
            code: upperCaseDepartmentCode,
            profileImage,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.department.findMany()
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await prisma.department.delete({
        where: {
            id
        }
    })
    return result
}

export const DepartmentService = {
    createDepartment,
    getAllFromDB,
    deleteFromDB
};