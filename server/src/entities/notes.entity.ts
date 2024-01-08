import { NoteType, NotesObjectType } from "../models/note.model";
import { UserType } from "../models/user.model";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";
import { EmailServiceType } from "../utils/emailService";

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

export async function validateAndSendEmails({
    emailService,
    user,
    note,
}: {
    emailService: EmailServiceType;
    user: UserType;
    note: NoteType;
}) {
    if (user.isBlocked) return `${user.email} is blocked`;

    const toEmail = user.email;
    const emailText = emailService.makeEmailText(note);
    const emailHtml = emailService.makeEmailHtml(note);

    return await emailService.sendEmail({
        to: toEmail,
        text: emailText,
        html: emailHtml,
    });
}
