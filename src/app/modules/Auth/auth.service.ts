import bcrypt from "bcryptjs";
import prisma from "../../../shared/prisma";
import { generateAccessToken, generateRefreshToken } from "../../../halpers/TokenGenarator";

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

    const accessToken = generateAccessToken({
        id: userData.id,
        email: userData.email,
    });

    const refreshToken = generateRefreshToken({
        id: userData.id,
        email: userData.email,
    });

    return {
        message: "Login successful",
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};

export const AuthService = {
    login,
};