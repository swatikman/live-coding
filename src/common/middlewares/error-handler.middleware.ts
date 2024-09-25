import {NextFunction, Request, Response} from "express";
import {HttpStatusCode} from "axios";

// it won't work without next function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const joiError = err as JoiError;
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