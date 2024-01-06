import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../server/src/index";

export const trpc = createTRPCReact<AppRouter>();
