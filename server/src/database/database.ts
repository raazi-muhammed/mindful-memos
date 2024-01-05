import User, { UserObjectType, UserType } from "../models/user.model";

export type DataBaseType = {
    insertUser: (data: UserObjectType) => void;
    getUserByEmail: (email: string) => any;
    getUserById: (id: string) => any;
};

async function insertUser(data: UserObjectType) {
    return await User.create(data);
}

async function getUserByEmail(email: string) {
    return await User.findOne({ email: email });
}

async function getUserById(id: string) {
    return await User.findById(id);
}

const database: DataBaseType = {
    insertUser,
    getUserByEmail,
    getUserById,
};
export default database;
