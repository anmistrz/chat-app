import { Response, Request, NextFunction } from "express";

export const signup = (req: Request, res: Response, next: NextFunction) => {
  res.send("Signup Route");
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.send("Login Route");
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.send("Logout Route");
};

const CAuth = {
    signup,
    login,
    logout,
};

export default CAuth;