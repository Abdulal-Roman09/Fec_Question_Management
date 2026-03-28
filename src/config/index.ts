import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    saltRound: Number(process.env.SALT_ROUND),
    databaseUrl: process.env.DATABASE_URL as string,
};

export default config;