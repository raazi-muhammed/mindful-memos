import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { loginUser, signUpUser } from "../controllers/user.controllers";
import asyncErrorHandler from "../utils/asyncErrorHandler";

router.post(
    "/login",
    asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            loginUser(req, res, next);
        }
    )
);

router.post(
    "/sign-up",
    asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            signUpUser(req, res, next);
        }
    )
);

export default router;
