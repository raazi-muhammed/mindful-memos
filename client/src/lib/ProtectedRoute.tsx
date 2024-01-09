import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!currentUser?.username) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    return <div>{children}</div>;
};

export default ProtectedRoute;
