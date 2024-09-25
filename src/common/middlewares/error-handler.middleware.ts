import {Request, Response} from "express";
import {HttpStatusCode} from "axios";

export const errorHandlerMiddleware = (err: Error | JoiError, req: Request, res: Response) => {
  const joiError = err as JoiError
  if (joiError && joiError.error && joiError.error.isJoi) {
    return res.status(HttpStatusCode.BadRequest).json({
      type: joiError.type,
      message: joiError.error.toString()
    });
  }
  res.status(HttpStatusCode.InternalServerError).send({
    message: 'Internal server error',
  });
}

export type JoiError = Error & {
  error: {
    isJoi: boolean
  },
  type: string,
}