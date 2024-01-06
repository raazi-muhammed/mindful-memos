import { DataBaseType } from "../database/database";
import { verifyAdmin } from "../entities/admin.entity";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";
import { comparePassword } from "../utils/encryption";

export async function loginAdminInteractor({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        return throwError(ErrorTypes.INTERNAL_SERVER_ERROR, "Invalid input");
    }
    const Credentials = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    };

    return verifyAdmin(comparePassword, Credentials, { password, username });
}

export async function getUsersInteractor(database: DataBaseType) {
    return await database.getUsers();
}
