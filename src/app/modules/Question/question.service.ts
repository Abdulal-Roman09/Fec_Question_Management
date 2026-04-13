import prisma from "../../../shared/prisma";
import { TCreateQuestionPayload } from "./question.type";
import { sendToCloudinary } from "../../../halpers/sendToCloudinary";

const insertInToDB = async (payload: TCreateQuestionPayload, files: any) => {
    let questionImage = "";
    let questionFile = "";

    if (files?.image && files.image[0]) {
        const upload = await sendToCloudinary(files.image[0]);
        questionImage = upload?.secure_url;
    }

    if (files?.file && files.file[0]) {
        const fileName = files.file[0].originalname?.split('.')[0] || 'file';
        const upload = await sendToCloudinary(files.file[0], {
            resource_type: 'auto',
            public_id: fileName,
            attachment: true
        });
        questionFile = upload?.secure_url;
    }

    console.log("questionImage:", questionImage);
    console.log("questionFile:", questionFile);
    console.log("payload:", payload);

    const existingQuestion = await prisma.questionSet.findFirst({
        where: {
            examTitle: payload.examTitle,
            subject: payload.subject,
            courseCode: payload.courseCode,
            batch: payload.batch,
            year: payload.year,
            session: payload.session
        },
    });

    if (existingQuestion) {
        throw new Error("Question already exists for this exam");
    }

    const result = await prisma.questionSet.create({
        data: {
            studentId: payload.studentId,
            departmentId: payload.departmentId,

            questionImage,
            questionFile,

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
    const result = await prisma.questionSet.findMany();
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
    insertInToDB,
    getAllFromDB,
    deleteFromDB,
};