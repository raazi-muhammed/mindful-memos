import { TRPCError } from "@trpc/server";
import database from "../database/database";
import { sendEmail } from "../utils/sendMail";
import {
    loginAdminInteractor,
    getUsersInteractor,
    setUserBlockStateInteractor,
    getMailListInteractor,
    sendNoteToMailingListInteractor,
} from "../useCases/admin.interactor";
type ErrorResponse = {
    success: false;
    message: string;
};

export async function loginAdmin(loginDetails: {
    username: string;
    password: string;
}) {
    return await loginAdminInteractor(loginDetails);
}

export async function setUserBlockState({
    userId,
    blockState,
}: {
    userId: string;
    blockState: boolean;
}) {
    return await setUserBlockStateInteractor(database, { userId, blockState });
}

export async function getUsers() {
    return await getUsersInteractor(database);
}

export async function getMailList() {
    return await getMailListInteractor(database);
}
export async function sendNoteToMailingList() {
    const data = await sendNoteToMailingListInteractor(database, sendEmail);
}
