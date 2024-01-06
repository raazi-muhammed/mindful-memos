import database from "../database/database";
import { UserType } from "../models/user.model";
import {
    loginAdminInteractor,
    getUsersInteractor,
} from "../useCases/adminInteractor";
type ErrorResponse = {
    success: false;
    message: string;
};

export async function loginAdmin(loginDetails: {
    username: string;
    password: string;
}) {
    const response = await loginAdminInteractor(loginDetails);

    if (response instanceof Error) {
        const res: ErrorResponse = {
            success: false,
            message: response.message,
        };
        return res;
    }

    const res: { success: true; message: string } = {
        success: true,
        message: "Login successful",
    };
    return res;
}

export async function getUsers() {
    const response = await getUsersInteractor(database);

    if (response instanceof Error) {
        const res: ErrorResponse = {
            success: false,
            message: response.message,
        };
        return res;
    }

    const res: { success: true; message: string; users: UserType[] } = {
        success: true,
        message: "Uses list fetched",
        users: response,
    };
    return res;
}
