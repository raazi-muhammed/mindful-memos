import User, { UserObjectType, UserType } from "../models/user.model";
import Note, { NoteType, NotesObjectType } from "../models/note.model";

async function insertUser(data: UserObjectType) {
    const user = await User.create(data);
    return user as UserType | undefined;
}

async function getUsers() {
    const user = await User.find({ isDeleted: false });
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

async function setUserBlockState(user: UserType, blockState: boolean) {
    const updatedInfo = await User.updateOne(
        { _id: user._id },
        { isBlocked: blockState },
        { upsert: true }
    );
    return updatedInfo.acknowledged ? true : false;
}
async function setUserDeleteState(user: UserType, deleteState: boolean) {
    const updatedInfo = await User.updateOne(
        { _id: user._id },
        { isDeleted: deleteState },
        { upsert: true }
    );
    return updatedInfo.acknowledged ? true : false;
}

async function addNote({ title, content, user }: NotesObjectType) {
    const note = await Note.create({ title, content, user });
    return note as NoteType;
}

async function getNotesFromUser(user: UserType) {
    const note = await Note.find({ user: user._id, isDeleted: false });
    return note as NoteType[];
}
async function getRandomNoteFromUser(user: UserType) {
    const randomNote = await Note.aggregate([
        { $match: { user: user._id, isDeleted: false } },
        { $sample: { size: 1 } },
    ]);
    if (randomNote.length < 1) return null;
    return randomNote[0] as NoteType;
}
async function editNote({
    noteId,
    title,
    content,
}: {
    noteId: string;
    title: string;
    content: string;
}) {
    await Note.updateOne({ _id: noteId }, { title, content });
}
async function deleteNoteById(noteId: string) {
    await Note.updateOne(
        { _id: noteId },
        { isDeleted: true },
        { upsert: true }
    );
}

export type DataBaseType = {
    insertUser: typeof insertUser;
    getUserByEmail: typeof getUserByEmail;
    getUserById: typeof getUserById;
    getUsers: typeof getUsers;
    addNote: typeof addNote;
    editNote: typeof editNote;
    deleteNoteById: typeof deleteNoteById;
    getNotesFromUser: typeof getNotesFromUser;
    editUser: typeof editUser;
    setUserBlockState: typeof setUserBlockState;
    getRandomNoteFromUser: typeof getRandomNoteFromUser;
    setUserDeleteState: typeof setUserDeleteState;
};
const database: DataBaseType = {
    insertUser,
    getUserByEmail,
    getUserById,
    editUser,
    getUsers,
    addNote,
    getNotesFromUser,
    deleteNoteById,
    editNote,
    setUserBlockState,
    getRandomNoteFromUser,
    setUserDeleteState,
};
export default database;
