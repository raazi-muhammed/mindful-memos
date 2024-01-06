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
    comparePassword: (pass1: string, pass2: string) => Promise<boolean>,
    password: string,
    user: UserType
) {
    const isPassCorrect = await comparePassword(password, user.password);
    console.log(isPassCorrect);

    if (!isPassCorrect) {
        return throwError(ErrorTypes.BAD_REQUEST, "Incorrect password");
    }
    return user;
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
