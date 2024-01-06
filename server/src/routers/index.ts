import { trpc } from "../lib/trpc";
import { userRouter } from "./user.router";
import { adminRouter } from "./admin.router";

export const appRouter = trpc.router({
    user: userRouter,
    admin: adminRouter,
});
