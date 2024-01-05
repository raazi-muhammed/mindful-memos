import { NextFunction, Request, Response } from "express";
import database from "../database/database";
import {
    createUserInteractor,
    loginUserInteractor,
} from "../useCases/userInteractor";

export async function signUpUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const signUpDetails = req.body as {
        email: string;
        password: string;
        username: string;
    };

    const response = await createUserInteractor(database, signUpDetails);

    if (response instanceof Error) {
        res.status(500).json({
            success: false,
            message: response.message,
        });
        return;
    }

    res.status(200).json({
        success: true,
        user: response,
    });
}

export async function loginUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const loginDetails = req.body as {
        email: string;
        password: string;
    };
    const response = await loginUserInteractor(database, loginDetails);

    if (response instanceof Error) {
        res.status(500).json({
            success: false,
            message: response.message,
        });
        return;
    }
    res.status(200).json({
        success: true,
        user: response,
    });
}
