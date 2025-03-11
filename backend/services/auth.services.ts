import IUser from "../interface/user.interface";
import { CustomError } from "../lib";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import { Response } from "express";
import cloudinary from "../lib/cloudinary";
import { formatResponse } from "../lib";


const signup = async (data: Pick<IUser, "email" | "password" | "fullName" | "_id">, res: Response) => {
    try {
        const { email, password, fullName, _id } = data;

        const isUser = await User.findOne({ email });
        
        if (isUser) {
            throw new CustomError(400, "User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (!newUser) {
            throw new CustomError(400, "User could not be created");
        }  else {
            generateToken(newUser._id, res!);
            await newUser.save();
            return newUser;
        } 

    } catch (error:any) {
        throw new CustomError(500, error.message);
    }
}

const login = async (data: Pick<IUser, "email" | "password">) => {
    try {
        const { email, password } = data;

        const user = await User.findOne({ email }).select("-__v").lean();
        if (!user) {
            throw new CustomError(400, "User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new CustomError(400, "Invalid credentials");
        }
        return user;
    } catch (error: any) {
        throw new CustomError(500, error.message);
    }
}

const updateProfilePicture = async (profilePicture: string, userId: string) => {
    try {
        const user = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: user.secure_url }, { new: true }).select("-password -__v -createdAt -updatedAt").lean();

        return updatedUser;
        
    } catch (error: any) {
        throw new CustomError(500, error.message);
    }
}


const SAuth = {
    signup,
    login,
    updateProfilePicture,
}

export default SAuth;