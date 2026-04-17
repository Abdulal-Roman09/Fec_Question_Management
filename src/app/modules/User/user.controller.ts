import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req.body, req.file as any);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Administrator account created successfully",
        data: result,
    });
});

const createStudent = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createStudent(req.body, req.file);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "stduents account created successfully",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "stduents retrive successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params

    const result = await UserService.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "stduents retrive successfully",
        data: result,
    });
});

export const UserController = {
    createAdmin,
    createStudent,
    getAllFromDB,
    deleteFromDB
};