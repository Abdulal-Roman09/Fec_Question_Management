import jwt from "jsonwebtoken";
import config from "../config";

export const generateAccessToken = (payload: { id: string; email: string }) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
};

export const generateRefreshToken = (payload: { id: string; email: string }) => {
    return jwt.sign(payload, config.refresh.refresh_secret, {
        expiresIn: config.refresh.refresh_expires_in,
    });
};