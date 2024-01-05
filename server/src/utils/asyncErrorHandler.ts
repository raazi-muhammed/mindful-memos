import { Request, Response, NextFunction } from "express";

const asyncErrorHandler =
    (func: Function) => (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: Error) => next(err));
    };

export default asyncErrorHandler;
