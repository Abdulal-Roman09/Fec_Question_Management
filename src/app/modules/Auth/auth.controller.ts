import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthService.login(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "your login successfully",
        data: result,
    });
});



export const AuthController = {
login
};