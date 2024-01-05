import { UserObjectType, UserType } from "../models/user.model";

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

    if (isPassCorrect) {
        return user;
    } else {
        return new Error("Incorrect password");
    }
}

export async function makeUser(
    getHashedPassword: MakeUserType["getHashedPassword"],
    { password, username, email }: MakeUserType["data"]
) {
    if (password.length < 6) {
        throw new Error("Password should at least 6 characters");
    }

    const encryptedPassword = await getHashedPassword(password);

    const user: UserObjectType = {
        email,
        password: encryptedPassword,
        username,
    };

    return user;
}
