import { NotesObjectType } from "../models/note.model";
import { UserType } from "../models/user.model";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";

export function makeNote({
    title,
    content,
    user,
}: {
    title: string;
    content: string;
    user: UserType;
}) {
    if (title.length < 2 || content.length < 2) {
        return throwError(ErrorTypes.BAD_REQUEST, "Invalid Data");
    }

    const note: NotesObjectType = {
        title,
        content,
        user,
        isDeleted: false,
    };

    return note;
}
