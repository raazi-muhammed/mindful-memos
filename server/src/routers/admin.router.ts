import { z } from "zod";
import {
    loginAdmin,
    getUsers,
    setUserBlockState,
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
});
