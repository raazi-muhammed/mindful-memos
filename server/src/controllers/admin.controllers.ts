import { TRPCError } from "@trpc/server";
import database from "../database/database";
import { UserType } from "../models/user.model";
import {
    loginAdminInteractor,
    getUsersInteractor,
} from "../useCases/admin.interactor";
type ErrorResponse = {
    success: false;
    message: string;
};
import { throwError, ErrorTypes } from "../utils/CustomErrorHandler";

export async function loginAdmin(loginDetails: {
    username: string;
    password: string;
}) {
    return await loginAdminInteractor(loginDetails);
}

export async function getUsers() {
    return await getUsersInteractor(database);
}
