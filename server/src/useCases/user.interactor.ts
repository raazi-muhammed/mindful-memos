import { DataBaseType } from "../database/database";
import { logUser, makeUser } from "../entities/user.entity";
import { UserObjectType } from "../models/user.model";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";
import { getHashedPassword, comparePassword } from "../utils/encryption";
import { signToken } from "../utils/token";

export async function loginUserInteractor(
    database: DataBaseType,
    { email, password }: { email: string; password: string }
) {
    const user = await database.getUserByEmail(email);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No User found");

    if (user.isBlocked) {
        return throwError(ErrorTypes.BAD_REQUEST, "User is Blocked");
    }

    return logUser(signToken, comparePassword, password, user);
}

export async function createUserInteractor(
    database: DataBaseType,
    {
        email,
        username,
        password,
    }: { email: string; username: string; password: string }
) {
    const alreadyUser = await database.getUserByEmail(email);
    if (alreadyUser) {
        return throwError(ErrorTypes.BAD_REQUEST, "User already exists");
    }

    const user = await makeUser(getHashedPassword, {
        email,
        username,
        password,
    });

    if (!user) throwError(ErrorTypes.BAD_REQUEST, "Invalid Data");

    const createdUser = await database.insertUser(user);
    if (!createdUser) {
        throwError(ErrorTypes.BAD_REQUEST, "Cannot create a user");
    }

    return createdUser;
}

export async function userProfileInteractor(
    database: DataBaseType,
    id: string
) {
    const user = await database.getUserById(id);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No user found");
    return user;
}

export async function editUserInteractor(
    database: DataBaseType,
    {
        email,
        username,
        avatar,
    }: { email: string; username: string; avatar?: string }
) {
    const user = await database.getUserByEmail(email);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No user found");

    if (avatar) {
        await database.editUser(user, { username, avatar });
    } else {
        await database.editUser(user, { username });
    }

    return user;
}

export async function loadUserInteractor(database: DataBaseType, id: string) {
    const user = await database.getUserById(id);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No user found");

    return user;
}
