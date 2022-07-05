import dotenv from 'dotenv'

dotenv.config()

export const DB_URL = process.env.DB_URL!
export const PORT = process.env.PORT!
export const SECRET_KEY = process.env.SECRET_KEY!
export const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET!
export const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET!
export const myEmail = process.env.Email!
export const password = process.env.Password!