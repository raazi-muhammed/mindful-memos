import { UserObjectType, UserType } from "../models/user.model";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";

type MakeUserType = {
    getHashedPassword: (name: string) => Promise<string>;
    data: {
        email: string;
        password: string;
        username: string;
    };
};

export async function logUser(
    signToken: (user: { email: string; _id: string }) => string | null,
    comparePassword: (pass1: string, pass2: string) => Promise<boolean>,
    password: string,
    user: UserType
) {
    const isPassCorrect = await comparePassword(password, user.password);
    if (!isPassCorrect) {
        return throwError(ErrorTypes.BAD_REQUEST, "Incorrect password");
    }

    const token = signToken({
        email: user.email,
        _id: user._id,
    });

    if (!token) return throwError(ErrorTypes.BAD_REQUEST, "An error occurred");
    return token;
}

export async function makeUser(
    getHashedPassword: MakeUserType["getHashedPassword"],
    { password, username, email }: MakeUserType["data"]
) {
    if (password.length < 6) {
        throwError(
            ErrorTypes.BAD_REQUEST,
            "Password should be greater than 6 characters"
        );
    }

    const encryptedPassword = await getHashedPassword(password);

    const user: UserObjectType = {
        email,
        password: encryptedPassword,
        username,
    };

    return user;
}
