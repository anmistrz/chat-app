import CustomError from "./customError"
import { StatusType, BaseResponse } from "../interface/response.interface"

const formatResponse = <T>(status: StatusType, message: string, data: T | [] = []): BaseResponse<T> => {
    return {
      status,
      message,
      data,
    }
  }
  
  export { CustomError, formatResponse }