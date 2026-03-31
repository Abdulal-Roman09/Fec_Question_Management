import prisma from "../../../shared/prisma";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";

const createDepartment = async (payload: { name: string; code: string }, file?: Express.Multer.File) => {
    let profileImage = "";

    // upload image
    if (file) {
        const upload = await sendToCloudinary(file);
        profileImage = upload?.secure_url;
    }

    // check duplicate by name OR code
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

    // uppercase code
    const upperCaseDepartmentCode = payload.code.toUpperCase();

    // create department
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

export const DepartmentService = {
    createDepartment,
    getAllFromDB
};