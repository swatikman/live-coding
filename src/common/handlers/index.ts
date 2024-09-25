import {Request, Response, NextFunction} from "express";

// unfortunately didn't have enough to fix this lint problem
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next);
};