import prisma from "../../../shared/prisma";
import { TCreateQuestionPayload } from "./question.type";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";
import { ICloudinaryResponse } from "../../../interface/file";


const createQuestion = async (payload: TCreateQuestionPayload, file?: ICloudinaryResponse) => {
    let questionImage = "";

    if (file) {
        const upload = await sendToCloudinary(file);
        questionImage = upload?.secure_url;
    }

    const existingQuestion = await prisma.questionSet.findFirst({
        where: {
            studentId: payload.studentId,
            examTitle: payload.examTitle,
            subject: payload.subject,
            courseCode: payload.courseCode,
            batch: payload.batch
        },
    });

    if (existingQuestion) {
        throw new Error("Question already exists for this exam & student");
    }

    const result = await prisma.questionSet.create({
        data: {
            studentId: payload.studentId,
            departmentId: payload.departmentId,

            questionImage,

            examTitle: payload.examTitle,
            subject: payload.subject,
            courseCode: payload.courseCode,
            examDate: payload.examDate,
            duration: payload.duration,

            batch: payload.batch,
            semester: payload.semester,
            section: payload.section,
            year: payload.year,
            session: payload.session,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.questionSet.findMany({
        include: {
            student: true,
            department: true,
        },
    });
    return result;
};

const deleteFromDB = async (id: string) => {
    const result = await prisma.questionSet.delete({
        where: {
            id,
        },
    });
    return result;
};

export const QuestionService = {
    createQuestion,
    getAllFromDB,
    deleteFromDB,
};