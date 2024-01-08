import { TRPCError } from "@trpc/server";
import database from "../database/database";
import { UserType } from "../models/user.model";
import {
    loginAdminInteractor,
    getUsersInteractor,
    setUserBlockStateInteractor,
} from "../useCases/admin.interactor";
type ErrorResponse = {
    success: false;
    message: string;
};

export async function loginAdmin(loginDetails: {
    username: string;
    password: string;
}) {
    return await loginAdminInteractor(loginDetails);
}

export async function setUserBlockState({
    userId,
    blockState,
}: {
    userId: string;
    blockState: boolean;
}) {
    return await setUserBlockStateInteractor(database, { userId, blockState });
}

export async function getUsers() {
    return await getUsersInteractor(database);
}
