import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../lib';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface CustomRequest extends Request {
    user?: any;
}

const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json(formatResponse(401, "F", "Unauthorized - Token missing", []));
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        if (!decoded) {
            res.status(401).json(formatResponse(401, "F", "Unauthorized - Token invalid", []));
            return;
        }

        const user = await User.findById(decoded.userId).select("-password -__v -createdAt -updatedAt").lean();
        if (!user) {
            res.status(404).json(formatResponse(404, "F", "User not found", []));
            return;
        }

        req.user = user;

        next();
    } catch (error: any) {
        res.status(500).json(formatResponse(500, "F", error.message, []));
    }
};

export default protectRoute;
