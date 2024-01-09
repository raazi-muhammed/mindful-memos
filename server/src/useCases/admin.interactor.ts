import { DataBaseType } from "../database/database";
import { verifyAdmin } from "../entities/admin.entity";
import { validateAndSendEmails } from "../entities/notes.entity";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";
import { EmailServiceType } from "../utils/emailService";
import { comparePassword } from "../utils/encryption";

export async function loginAdminInteractor({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        return throwError(ErrorTypes.INTERNAL_SERVER_ERROR, "Invalid input");
    }
    const Credentials = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    };

    return verifyAdmin(comparePassword, Credentials, { password, username });
}

export async function getUsersInteractor(database: DataBaseType) {
    return await database.getUsers();
}

export async function getMailListInteractor(database: DataBaseType) {
    const today = new Date();

    const users = await database.getUsers();
    const userListingPromise = users.map(async (u) => {
        const note = await database.getRandomNoteFromUser(u);
        return {
            date: today,
            user: u,
            note,
        };
    });

    const userNotes = await Promise.all(userListingPromise);
    const userListing = userNotes.filter((u) => u.note);

    return userListing;
}

export async function sendNoteToMailingListInteractor(
    database: DataBaseType,
    emailService: EmailServiceType
) {
    const userListing = await getMailListInteractor(database);
    const sendMailPromises = userListing.map(async (list) => {
        if (list.note) {
            return await validateAndSendEmails({
                emailService,
                user: list.user,
                note: list.note,
            });
        }
    });

    return Promise.all(sendMailPromises);
}

export async function setUserBlockStateInteractor(
    database: DataBaseType,
    { userId, blockState }: { userId: string; blockState: boolean }
) {
    const user = await database.getUserById(userId);
    if (!user) {
        return throwError(ErrorTypes.INTERNAL_SERVER_ERROR, "User not found");
    }
    const isBlocked = await database.setUserBlockState(user, blockState);
    if (!isBlocked) {
        return throwError(
            ErrorTypes.INTERNAL_SERVER_ERROR,
            "An error occurred while blocking"
        );
    }
    return "User Blocked";
}

export async function deleteUserInteractor(
    database: DataBaseType,
    userId: string
) {
    const user = await database.getUserById(userId);
    if (!user) {
        return throwError(ErrorTypes.INTERNAL_SERVER_ERROR, "User not found");
    }

    database.setUserDeleteState(user, true);

    return "User Blocked";
}
