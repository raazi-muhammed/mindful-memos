import User, { UserObjectType, UserType } from "../models/user.model";

export type DataBaseType = {
    insertUser: (data: UserObjectType) => Promise<UserType | undefined>;
    getUserByEmail: (email: string) => Promise<UserType | undefined>;
    getUserById: (id: string) => Promise<UserType | undefined>;
    editUser: (
        user: UserType,
        { username, avatar }: { username: string; avatar?: string }
    ) => Promise<void>;
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

async function editUser(
    user: UserType,
    { username, avatar }: { username: string; avatar?: string }
) {
    let newUser;
    if (!avatar) {
        newUser = await User.updateOne(
            { _id: user._id },
            { username },
            { upsert: true }
        );
    } else {
        newUser = await User.updateOne(
            { _id: user._id },
            { username, avatar },
            { upsert: true }
        );
    }
    console.log(newUser);
    return;
}

const database: DataBaseType = {
    insertUser,
    getUserByEmail,
    getUserById,
    editUser,
};
export default database;
