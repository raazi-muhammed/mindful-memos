import User, { UserObjectType, UserType } from "../models/user.model";

export type DataBaseType = {
    insertUser: (data: UserObjectType) => void;
    getUserByEmail: (email: string) => any;
};

async function insertUser(data: UserObjectType) {
    return await User.create(data);
}

async function getUserByEmail(email: string) {
    return await User.findOne({ email: email });
}

const database: DataBaseType = {
    insertUser,
    getUserByEmail,
};
export default database;
