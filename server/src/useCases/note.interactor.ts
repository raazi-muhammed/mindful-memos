import { DataBaseType } from "../database/database";
import { makeNote } from "../entities/notes.entity";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";

export async function addNoteInteractor(
    database: DataBaseType,
    {
        userId,
        title,
        content,
    }: { userId: string; title: string; content: string }
) {
    const user = await database.getUserById(userId);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No User found");

    const note = makeNote({ title, content, user });
    if (!note) return throwError(ErrorTypes.BAD_REQUEST, "An error occcured");

    database.addNote(note);
}

export async function editNoteInteractor(
    database: DataBaseType,
    {
        noteId,
        title,
        content,
    }: { noteId: string; title: string; content: string }
) {
    database.editNote({ noteId, title, content });
}

export async function getNotesInteractor(
    database: DataBaseType,
    userId: string
) {
    const user = await database.getUserById(userId);
    if (!user) return throwError(ErrorTypes.BAD_REQUEST, "No User found");

    const notes = await database.getNotesFromUser(user);
    return notes;
}

export async function deleteNoteInteractor(
    database: DataBaseType,
    noteId: string
) {
    const note = await database.deleteNoteById(noteId);
    return note;
}
