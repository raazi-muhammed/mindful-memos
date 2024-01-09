import { z } from "zod";
import {
    loginAdmin,
    getUsers,
    getMailList,
    setUserBlockState,
    sendNoteToMailingList,
    deleteUser,
} from "../controllers/admin.controllers";
import { trpc } from "../lib/trpc";

const adminLoginProcedure = trpc.procedure.input(
    z.object({
        username: z.string(),
        password: z.string(),
    })
);

export const adminRouter = trpc.router({
    login: adminLoginProcedure.mutation(async (opts) => {
        return await loginAdmin(opts.input);
    }),
    users: trpc.procedure.query(async () => {
        return await getUsers();
    }),
    setUserBlock: trpc.procedure
        .input(z.object({ userId: z.string(), blockState: z.boolean() }))
        .mutation(async (opts) => {
            return await setUserBlockState(opts.input);
        }),
    deleteUserById: trpc.procedure.input(z.string()).mutation(async (opts) => {
        return await deleteUser(opts.input);
    }),
    sendMail: trpc.procedure.mutation(async (opts) => {
        return await sendNoteToMailingList();
    }),
    getMailingList: trpc.procedure.query(async () => {
        return await getMailList();
    }),
});
