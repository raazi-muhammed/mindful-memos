import { loginAdminInteractor } from "../useCases/adminInteractor";
type ErrorResponse = {
    success: false;
    message: string;
};

export async function loginAdmin(loginDetails: {
    username: string;
    password: string;
}) {
    const response = await loginAdminInteractor(loginDetails);

    if (response instanceof Error) {
        const res: ErrorResponse = {
            success: false,
            message: response.message,
        };
        return res;
    }

    const res: { success: true; message: string } = {
        success: true,
        message: "Login successful",
    };
    return res;
}
