import { NextFunction, Request, Response } from "express";
import { loginAdminInteractor } from "../useCases/adminInteractor";
import { getHashedPassword } from "../utils/encryption";

export async function loginAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const loginDetails = req.body as {
        username: string;
        password: string;
    };

    const response = await loginAdminInteractor(loginDetails);

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
