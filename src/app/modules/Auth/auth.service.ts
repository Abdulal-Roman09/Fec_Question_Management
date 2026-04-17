import bcrypt from "bcryptjs";
import prisma from "../../../shared/prisma";
import { generateToken } from "../../../halpers/TokenGenarator";
import { email } from "zod";

const login = async (payload: { email: string; password: string }) => {

    const userData = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (!userData) {
        throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        userData.password
    );

    if (!isPasswordMatched) {
        throw new Error("Password incorrect");
    }
    const token = generateToken({
        id: userData.id,
        email: userData.email,
    });
    
    return {
        message: "Login successful",
        token,
    };
};

export const AuthService = {
    login,
};