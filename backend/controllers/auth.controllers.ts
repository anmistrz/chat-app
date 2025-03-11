import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import SAuth from "../services/auth.services";
import { generateToken } from "../lib/utils";
import { CustomError, formatResponse } from "../lib";

const signup = async (req: Request, res: Response | any, next: NextFunction) => {
    try {
        const { email, password, fullName } = req.body;
        // Check if the user already exists
        if (password.length < 6) {
          throw new CustomError(400, "Password must be at least 6 characters long");
        }

        const user = await SAuth.signup({ email, password, fullName }, res);
        if (user) {
            res.status(201).json(formatResponse(201, "T", "User created successfully", res.json({
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture,
            })));
        }
    } catch (error: any) {
        res.status(500).json(formatResponse(500, "F", error.message, res));
        return;
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await SAuth.login({ email, password });
        if (user) {
            generateToken(user._id.toString(), res);
            res.status(200).json(formatResponse(200, "T", "User logged in successfully", {
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture,
            }));
        } else {
            formatResponse(400, "F", "Invalid credentials", res);
        }
    } catch (error: any) {
        res.status(500).json(formatResponse(500, "F", error.message, res));
        return;
    }
};

const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
        });
        res.status(200).json({ message: "User logged out successfully" });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
};

const updateProfile = async(req: Request | any, res: Response) => {
    try {
        const { profilePicture } = req.body;
        const userId = req.user._id;

        if(!profilePicture) {
            res.status(400).json(formatResponse(400, "F", "Profile picture is required", res));
            return;
        }

        const userResult = await SAuth.updateProfilePicture(profilePicture, userId);
        
        if(!userResult) {
            res.status(500).json(formatResponse(500, "F", "Profile picture could not be updated", res));
            return;
        }

        res.status(200).json(formatResponse(200, "T", "Profile picture updated successfully", res.json({
            fullName: userResult.fullName,
            profilePicture: userResult.profilePicture,
        })));
        return;

    } catch (error: any) {
        res.status(500).json(formatResponse(500, "F", error.message, res));
        return;
    }
};



const authCheck = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {

    try {
  
      // implementation
  
      res.status(200).json(formatResponse(200, "T", "User authenticated successfully", req.user));
    } catch (error) {
  
      // error handling
  
      res.status(500).json(formatResponse(500, "F", "User not authenticated", []));
  
    }
  
  }
  
  

const CAuth = {
    signup,
    login,
    logout,
    updateProfile,
    authCheck,
};

export default CAuth;