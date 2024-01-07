import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserProfileDropDown } from "../user/UserProfileDropDown";
import { setUser } from "@/app/userSlice";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "./Container";

const NavBar = () => {
    const dispatch = useDispatch();

    const response = trpc.user.loadUser.useQuery();
    const userData = response?.data as UserType;

    useEffect(() => {
        dispatch(setUser(userData));
    }, [userData]);

    return (
        <nav className="bg-muted flex">
            <Container className="flex justify-between align-middle px-8 py-2">
                <p className="text-primary font-semibold text-lg my-auto">
                    MindfulMemos
                </p>
                {userData ? (
                    <UserProfileDropDown />
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
