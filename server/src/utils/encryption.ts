import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function getHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
    password1: string,
    password2: string
): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
}
