import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

type TokenType = { email: string; _id: string };
export function signToken(data: TokenType) {
    if (!ACCESS_TOKEN_SECRET) return null;
    return jwt.sign(data, ACCESS_TOKEN_SECRET);
}

export async function decodeToken(token: string) {
    if (!ACCESS_TOKEN_SECRET) return null;

    return new Promise<TokenType | null>((resolve) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                resolve(null);
            } else {
                resolve(user as TokenType);
            }
        });
    });
}
