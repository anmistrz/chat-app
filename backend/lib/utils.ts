import { Document } from "mongoose"
import IUser from "../interface/user.interface"
import jwt from "jsonwebtoken"
import { Response } from "express"


export const generateToken = (userId: Document["_id"], res: Response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross site scripting
        sameSite: "strict", // CSRF attacks
        secure: process.env.NODE_ENV === "production" ? true : false
    })
}