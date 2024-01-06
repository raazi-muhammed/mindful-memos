import { NextFunction, Request, Response } from "express";
import database from "../database/database";
import {
    createUserInteractor,
    loginUserInteractor,
    userProfileInteractor,
} from "../useCases/userInteractor";
import { UserType } from "../models/user.model";

export async function signUpUser(signUpDetails: {
    email: string;
    password: string;
    username: string;
}) {
    const response = await createUserInteractor(database, signUpDetails);

    if (response instanceof Error) {
        const res: ErrorResponse = {
            success: false,
            message: response.message,
        };
        return res;
    }
    const res: { success: true; user: UserType; message: string } = {
        success: true,
        user: response,
        message: "Account Created",
    };
    return res;
}

type ErrorResponse = {
    success: false;
    message: string;
};

export async function loginUser(loginDetails: {
    email: string;
    password: string;
}) {
    const response = await loginUserInteractor(database, loginDetails);
    if (response instanceof Error) {
        const res: ErrorResponse = {
            success: false,
            message: response.message,
        };
        return res;
    }

    const res: { success: true; user: UserType; message: string } = {
        success: true,
        user: response,
        message: "Login successful",
    };
    return res;
}

export async function userProfile(userId: string) {
    if (!userId) {
        return new Error("Bad request");
    }

    const response = await userProfileInteractor(database, userId);

    if (response instanceof Error) {
        return {
            success: false,
            message: response.message,
        };
    }
    return {
        success: true,
        user: response,
    };
}
