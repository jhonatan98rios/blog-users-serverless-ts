export type ErrorResponse = {
  message: string,
  statusCode: number
}

export default class AppError {
  static json(message: string, statusCode = 400): ErrorResponse {
    return {
      message,
      statusCode
    }
  }
}
