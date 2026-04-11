import prisma from "../../../shared/prisma";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";

const createQuestion = async (payload: { name: string; code: string }, file?: Express.Multer.File) => {
    let profileImage = "";

    // upload image
    if (file) {
        const upload = await sendToCloudinary(file);
        profileImage = upload?.secure_url;
    }

    // check duplicate by name OR code
    const existingQuestion = await prisma.Question.findFirst({
        where: {
            OR: [
                { name: payload.name },
                { code: payload.code.toUpperCase() },
            ],
        },
    });

    if (existingQuestion) {
        throw new Error("Question already exists");
    }

    // uppercase code
    const upperCaseQuestionCode = payload.code.toUpperCase();

    // create Question
    const result = await prisma.Question.create({
        data: {
            name: payload.name,
            code: upperCaseQuestionCode,
            profileImage,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.question.findMany()
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await prisma.question.delete({
        where: {
            id
        }
    })
    return result
}

export const QuestionService = {
    createQuestion,
    getAllFromDB,
    deleteFromDB
};