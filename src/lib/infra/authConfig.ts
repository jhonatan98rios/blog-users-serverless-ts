import * as dotenv from 'dotenv'
dotenv.config()

export const authConfig = {
    jwt: {
        secret: process.env.APP_SECRET!,
        expiresIn: '7d',
    },
};