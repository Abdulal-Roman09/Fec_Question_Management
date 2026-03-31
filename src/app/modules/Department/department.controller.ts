import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DepartmentService } from "./department.service";

const createDepartment = catchAsync(async (req: Request, res: Response) => {

    const result = await DepartmentService.createDepartment(req.body, req.file);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Administrator account created successfully",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const result = await DepartmentService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Departments fetched successfully",
        data: result,
    });
});


export const DepartmentController = {
    createDepartment,
    getAllFromDB
};