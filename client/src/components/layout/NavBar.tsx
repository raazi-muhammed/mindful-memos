import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserProfileDropDown } from "../user/UserProfileDropDown";
import { setUser } from "@/features/auth/userSlice";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "./Container";
import { FaLeaf } from "react-icons/fa";

const NavBar = () => {
    const dispatch = useDispatch();

    const response = trpc.user.loadUser.useQuery();
    const userData = response?.data as UserType;

    useEffect(() => {
        dispatch(setUser(userData));
    }, [userData]);

    return (
        <nav className="flex max-w-xl mx-auto">
            <Container className="bg-card rounded flex justify-between align-middle p-2 py-2 my-4 mx-8">
                <Link to="/" className="my-auto">
                    <div className="flex gap-2 align-middle ms-4">
                        <FaLeaf className="my-auto text-primary" size="1.2em" />
                        <p className="text-primary font-semibold text-lg my-auto font-heading">
                            MindfulMemos
                        </p>
                    </div>
                </Link>
                {userData ? (
                    <UserProfileDropDown userData={userData} />
                ) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                )}
            </Container>
        </nav>
    );
};

export default NavBar;
