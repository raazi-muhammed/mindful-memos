import User, { UserObjectType, UserType } from "../models/user.model";
import Note, { NoteType, NotesObjectType } from "../models/note.model";

export type DataBaseType = {
    insertUser: (data: UserObjectType) => Promise<UserType | undefined>;
    getUserByEmail: (email: string) => Promise<UserType | undefined>;
    getUserById: (id: string) => Promise<UserType | undefined>;
    getUsers: () => Promise<UserType[]>;
    addNote: ({ title, content, user }: NotesObjectType) => Promise<NoteType>;
    getNotesFromUser: (user: UserType) => Promise<NoteType[]>;
    editUser: (
        user: UserType,
        { username, avatar }: { username: string; avatar?: string }
    ) => Promise<void>;
};

async function insertUser(data: UserObjectType) {
    const user = await User.create(data);
    return user as UserType | undefined;
}

async function getUsers() {
    const user = await User.find({});
    return user as UserType[];
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
    return;
}

async function addNote({ title, content, user }: NotesObjectType) {
    const note = await Note.create({ title, content, user });
    return note as NoteType;
}

async function getNotesFromUser(user: UserType) {
    const note = await Note.find({ user: user._id });
    return note as NoteType[];
}

const database: DataBaseType = {
    insertUser,
    getUserByEmail,
    getUserById,
    editUser,
    getUsers,
    addNote,
    getNotesFromUser,
};
export default database;
