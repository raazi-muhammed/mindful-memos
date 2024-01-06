import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";

export async function verifyAdmin(
    comparePassword: (pass1: string, pass2: string) => Promise<boolean>,
    credentials: { username: string; password: string },
    toCheck: { username: string; password: string }
) {
    if (credentials.username !== toCheck.username) {
        return throwError(
            ErrorTypes.INTERNAL_SERVER_ERROR,
            "Username Incorrect"
        );
    }

    const encryptedPassword = await comparePassword(
        toCheck.password,
        credentials.password
    );
    if (encryptedPassword) {
        return encryptedPassword;
    } else {
        return throwError(
            ErrorTypes.INTERNAL_SERVER_ERROR,
            "Password Incorrect"
        );
    }
}
