import IUser from "../interface/user.interface"
import User from "../models/user.model"

declare module 'express-serve-static-core' {
  interface Request {
    user?: typeof User
  }
}