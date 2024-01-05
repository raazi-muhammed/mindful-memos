import { verifyAdmin } from "../entities/admin.entity";
import { comparePassword } from "../utils/encryption";

export async function loginAdminInteractor({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        return new Error("Admin username and password not found");
    }
    const Credentials = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    };

    return verifyAdmin(comparePassword, Credentials, { password, username });
}
