type StatusType = boolean | "T" | "F"

interface BaseResponse<T> {
  code: number
  status: StatusType
  message: string
  data: T | []
}

export { BaseResponse, StatusType }