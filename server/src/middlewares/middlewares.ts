import { TRPCError } from "@trpc/server";
import { trpc } from "../lib/trpc";
import { decodeToken } from "../utils/token";

export const isUserMiddleware = trpc.middleware(async ({ ctx, next }) => {
    if (!ctx?.authorization) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    try {
        const data = await decodeToken(ctx.authorization);

        if (data) {
            return next({ ctx: { user: data } });
        } else {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
    } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
});
