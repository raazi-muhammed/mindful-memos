import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserProfileDropDown } from "../custom/UserProfileDropDown";
import { setUser } from "@/app/userSlice";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const NavBar = () => {
    const dispatch = useDispatch();

    const response = trpc.user.loadUser.useQuery();
    const userData = response?.data as UserType;

    useEffect(() => {
        dispatch(setUser(userData));
    }, [userData]);

    return (
        <nav>
            {userData ? (
                <UserProfileDropDown />
            ) : (
                <Link to="login">
                    <Button>login</Button>
                </Link>
            )}
        </nav>
    );
};

export default NavBar;
