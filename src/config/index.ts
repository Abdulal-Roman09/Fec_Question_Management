import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    saltRound: Number(process.env.SALT_ROUND),
    databaseUrl: process.env.DATABASE_URL as string,


    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        api_key: process.env.CLOUDINARY_API_KEY as string,
        api_secret: process.env.CLOUDINARY_API_SECRET as string,
    },
    jwt: {
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_EXPIRES_IN as string,
    },
};

export default config;