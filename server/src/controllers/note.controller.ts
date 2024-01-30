import database from "../database/database";
import {
    addNoteInteractor,
    getNotesInteractor,
    deleteNoteInteractor,
    editNoteInteractor,
} from "../useCases/note.interactor";

export async function addNote(noteDetails: {
    title: string;
    content: string;
    userId: string;
}) {
    return await addNoteInteractor(database, noteDetails);
}

export async function editNote(noteDetails: {
    noteId: string;
    title: string;
    content: string;
    userId: string;
}) {
    console.log("ss waht ssthing");

    return await editNoteInteractor(database, noteDetails);
}

export async function deleteNote(noteId: string) {
    return await deleteNoteInteractor(database, noteId);
}

export async function getNotesFromUser(userId: string) {
    return await getNotesInteractor(database, userId);
}
