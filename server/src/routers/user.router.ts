import {
    loginUser,
    signUpUser,
    userProfile,
    editProfile,
} from "../controllers/user.controllers";
import { trpc } from "../lib/trpc";
import { z } from "zod";

const userProfileProcedure = trpc.procedure.input(z.string());
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

export const userRouter = trpc.router({
    login: userLoginProcedure.mutation(async (opts) => {
        return await loginUser(opts.input);
    }),
    signUp: userSignUpProcedure.mutation(async (opts) => {
        return await signUpUser(opts.input);
    }),
    profile: userProfileProcedure.query(async (opts) => {
        return await userProfile(opts.input);
    }),
    edit: userEditProcedure.mutation(async (opts) => {
        return await editProfile(opts.input);
    }),
});
