import {NextFunction, Request, Response} from "express";
import {HttpStatusCode} from "axios";

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(HttpStatusCode.BadRequest).json({
      type: err.type,
      message: err.error.toString()
    });
  }
  res.status(HttpStatusCode.InternalServerError).send({
    message: 'Internal server error',
  });
}