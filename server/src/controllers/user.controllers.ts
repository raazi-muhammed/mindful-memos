import database from "../database/database";
import {
    createUserInteractor,
    loginUserInteractor,
    userProfileInteractor,
    editUserInteractor,
    loadUserInteractor,
} from "../useCases/user.interactor";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";

export async function signUpUser(signUpDetails: {
    email: string;
    password: string;
    username: string;
}) {
    return await createUserInteractor(database, signUpDetails);
}

export async function loginUser(loginDetails: {
    email: string;
    password: string;
}) {
    return await loginUserInteractor(database, loginDetails);
}

export async function editProfile(userDetails: {
    username: string;
    avatar?: string;
    email: string;
}) {
    return await editUserInteractor(database, userDetails);
}

export async function userProfile(userId: string) {
    if (!userId) {
        return throwError(ErrorTypes.BAD_REQUEST, "Invalid Input");
    }
    return await userProfileInteractor(database, userId);
}

export async function loadUser(userId: string) {
    if (!userId) {
        return throwError(ErrorTypes.BAD_REQUEST, "Invalid Input");
    }
    return await loadUserInteractor(database, userId);
}
