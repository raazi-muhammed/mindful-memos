import database from "../database/database";
import {
    addNoteInteractor,
    getNotesInteractor,
} from "../useCases/note.interactor";

export async function addNote(noteDetails: {
    title: string;
    content: string;
    userId: string;
}) {
    return await addNoteInteractor(database, noteDetails);
}

export async function getNotesFromUser(userId: string) {
    return await getNotesInteractor(database, userId);
}
