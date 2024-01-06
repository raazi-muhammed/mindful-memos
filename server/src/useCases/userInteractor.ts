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

    if (!user) return new Error("Invalid data");

    const createdUser = await database.insertUser(user);
    if (!createdUser) return new Error("Cannot crate user");

    return createdUser;
}

export async function userProfileInteractor(
    database: DataBaseType,
    id: string
) {
    const user = await database.getUserById(id);
    if (!user) return new Error("No user found");
    return user;
}

export async function editUserInteractor(
    database: DataBaseType,
    { email, username, avatar }: Omit<UserObjectType, "password">
) {
    const user = await database.getUserByEmail(email);
    if (!user) return new Error("No user found");

    if (avatar) {
        console.log("editing");

        await database.editUser(user, { username, avatar });
        console.log("editied");
    } else {
        await database.editUser(user, { username });
    }

    return user;
}
