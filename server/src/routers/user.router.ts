import {
    loginUser,
    signUpUser,
    userProfile,
    editProfile,
    loadUser,
} from "../controllers/user.controllers";
import { addNote, getNotesFromUser } from "../controllers/note.controller";
import { trpc } from "../lib/trpc";
import { z } from "zod";
import { isUserMiddleware } from "../middlewares/middlewares";

const userLoginProcedure = trpc.procedure.input(
    z.object({
        email: z.string(),
        password: z.string(),
    })
);
const userSignUpProcedure = trpc.procedure.input(
    z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
    })
);
const userEditProcedure = trpc.procedure.input(
    z.object({
        email: z.string(),
        username: z.string(),
        avatar: z.string().optional(),
    })
);
const addNoteProcedure = trpc.procedure.input(
    z.object({
        title: z.string(),
        content: z.string(),
    })
);

export const userRouter = trpc.router({
    login: userLoginProcedure.mutation(async (opts) => {
        return await loginUser(opts.input);
    }),
    signUp: userSignUpProcedure.mutation(async (opts) => {
        return await signUpUser(opts.input);
    }),
    profile: trpc.procedure.use(isUserMiddleware).query(async (opts) => {
        return await userProfile(opts.ctx?.user?._id);
    }),
    edit: userEditProcedure.use(isUserMiddleware).mutation(async (opts) => {
        return await editProfile(opts.input);
    }),
    loadUser: trpc.procedure.use(isUserMiddleware).query(async (opts) => {
        return await loadUser(opts.ctx?.user?._id);
    }),
    addNote: addNoteProcedure.use(isUserMiddleware).mutation(async (opts) => {
        return await addNote({
            title: opts.input.title,
            content: opts.input.content,
            userId: opts.ctx?.user?._id,
        });
    }),
    getNotes: trpc.procedure.use(isUserMiddleware).query(async (opts) => {
        return await getNotesFromUser(opts.ctx?.user?._id);
    }),
});
