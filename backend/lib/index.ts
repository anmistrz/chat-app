import CustomError from "./customError"
import { StatusType, BaseResponse } from "../interface/response.interface"

const formatResponse = <T>(code: number, status: StatusType, message: string, data: T | [] = []): BaseResponse<T> => {
    return {
      code,
      status,
      message,
      data,
    }
  }
  
  export { CustomError, formatResponse }