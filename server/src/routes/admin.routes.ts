import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import { loginAdmin } from "../controllers/admin.controllers";

const router = express.Router();

router.post(
    "/login",
    asyncErrorHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            loginAdmin(req, res, next);
        }
    )
);

export default router;
