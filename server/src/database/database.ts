import User, { UserObjectType, UserType } from "../models/user.model";

export type DataBaseType = {
    insertUser: (data: UserObjectType) => Promise<UserType | undefined>;
    getUserByEmail: (email: string) => Promise<UserType | undefined>;
    getUserById: (id: string) => Promise<UserType | undefined>;
};

async function insertUser(data: UserObjectType) {
    const user = await User.create(data);
    return user as UserType | undefined;
}

async function getUserByEmail(email: string) {
    const user = await User.findOne({ email: email });
    return user as UserType | undefined;
}

async function getUserById(id: string) {
    const user = await User.findById(id);
    return user as UserType | undefined;
}

const database: DataBaseType = {
    insertUser,
    getUserByEmail,
    getUserById,
};
export default database;
