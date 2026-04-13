import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StudentService } from "./student.service";




const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const result = await StudentService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Students fetched successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params
    const result = await StudentService.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "delete Students successfully",
        data: result,
    });
});


export const StudentController = {
    getAllFromDB,
    deleteFromDB
};