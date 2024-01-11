import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export enum AllowedEnum {
    ADMIN_ONLY = "ADMIN_ONLY",
    LOGGED_USER_ONLY = "LOGGED_USER_ONLY",
}

const ProtectedRoute = ({
    children,
    allowed,
}: {
    children: any;
    allowed: AllowedEnum;
}) => {
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.user.user);
    const currentAdmin = useSelector((state: RootState) => state.user.admin);

    useEffect(() => {
        if (allowed === AllowedEnum.LOGGED_USER_ONLY) {
            if (Object.keys(currentUser).length <= 0) {
                navigate("/login");
            }
        }
        if (allowed === AllowedEnum.ADMIN_ONLY) {
            if (Object.keys(currentAdmin).length <= 0) {
                navigate("/admin/login");
            }
        }
    }, [currentUser, navigate]);

    return <div>{children}</div>;
};

export default ProtectedRoute;
