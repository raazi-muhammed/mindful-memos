import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../server/src/index";
type Options = {
    toaster?: ({
        title,
        description,
    }: {
        title?: string;
        description: string;
    }) => void;
};

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "http://localhost:4000/api/v1/" })],
});

export async function getProfile(id: string) {
    const result = await client.user.profile.query(id);
    return result;
}

export async function adminLogin(
    userDetails: {
        username: string;
        password: string;
    },
    options: Options
) {
    const result = await client.admin.login.mutate(userDetails);
    if (options?.toaster && result?.message) {
        options.toaster({
            description: result?.message || "Invalid Details",
        });
    }
    if (!result.success) throw new Error(result.message);
    return result;
}

export async function userLogin(
    userDetails: {
        email: string;
        password: string;
    },
    options: Options
) {
    const result = await client.user.login.mutate(userDetails);
    if (options?.toaster && result?.message) {
        options.toaster({
            description: result?.message || "Invalid Details",
        });
    }
    if (!result.success) throw new Error(result.message);
    return result;
}

export async function userSignUp(
    userDetails: {
        email: string;
        username: string;
        password: string;
    },
    options: Options
) {
    const result = await client.user.signUp.mutate(userDetails);
    if (options?.toaster && result?.message) {
        options.toaster({
            description: result?.message || "Invalid Details",
        });
    }
    if (!result.success) throw new Error(result.message);
    return result;
}

export default {
    getProfile,
    userLogin,
    userSignUp,
    adminLogin,
};
