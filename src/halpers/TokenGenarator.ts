import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: { id: string; email: string }) => {
    const secret: Secret = config.jwt.secret;

    const options: SignOptions = {
        expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
};