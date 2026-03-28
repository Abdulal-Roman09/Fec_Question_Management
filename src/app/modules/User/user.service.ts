import bcrypt from "bcryptjs";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { UserController } from "./user.controller";


const createAdmin = async (payload: any) => {
    console.log("hlw woruld")
};


export const UserService = {
    createAdmin,
}