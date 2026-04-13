import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { QuestionService } from "./question.service";

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
    const result = await QuestionService.insertInToDB(req.body, req.files as any);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Question created successfully",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await QuestionService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Questions fetched successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await QuestionService.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Question deleted successfully",
        data: result,
    });
});

export const QuestionController = {
    insertInToDB,
    getAllFromDB,
    deleteFromDB
};