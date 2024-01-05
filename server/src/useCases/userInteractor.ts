import { DataBaseType } from "../database/database";
import { logUser, makeUser } from "../entities/user.entity";
import { UserObjectType } from "../models/user.model";
import { getHashedPassword, comparePassword } from "../utils/encryption";

export async function loginUserInteractor(
    database: DataBaseType,
    { email, password }: { email: string; password: string }
) {
    const user = await database.getUserByEmail(email);
    if (!user) return new Error("No user found");

    return logUser(comparePassword, password, user);
}

export async function createUserInteractor(
    database: DataBaseType,
    { email, username, password }: UserObjectType
) {
    const alreadyUser = await database.getUserByEmail(email);
    if (alreadyUser) return new Error("User already exist");

    const user = await makeUser(getHashedPassword, {
        email,
        username,
        password,
    });

    if (user) {
        return database.insertUser(user);
    }
}
