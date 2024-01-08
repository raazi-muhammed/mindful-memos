import { DataBaseType } from "../database/database";
import { verifyAdmin } from "../entities/admin.entity";
import { ErrorTypes, throwError } from "../utils/CustomErrorHandler";
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
            email: u.email,
            note,
        };
    });

    const userNotes = await Promise.all(userListingPromise);
    const userListing = userNotes.filter((u) => u.note);

    return userListing;
}

export async function sendNoteToMailingListInteractor(
    database: DataBaseType,
    sendEmail: ({ to, content }: { to: string; content: string }) => null
) {
    const userListing = await getMailListInteractor(database);
    userListing.map((list) => {
        sendEmail({
            to: list.email,
            content: list.note?.title || "Please add a note",
        });
    });
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
