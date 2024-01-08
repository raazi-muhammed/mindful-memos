import { TRPCError } from "@trpc/server";
import { trpc } from "../lib/trpc";
import { decodeToken } from "../utils/token";
import database from "../database/database";

export const isUserMiddleware = trpc.middleware(async ({ ctx, next }) => {
    if (!ctx?.authorization) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    try {
        const data = await decodeToken(ctx.authorization);

        if (data) {
            const user = await database.getUserById(data._id);
            if (!user)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User not found",
                });
            if (user.isBlocked)
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User blocked",
                });

            return next({ ctx: { user: user } });
        } else {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
    } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
});
