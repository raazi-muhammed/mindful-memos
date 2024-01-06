import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "../middlewares/context";

export const trpc = initTRPC
    .context<inferAsyncReturnType<typeof createContext>>()
    .create();
