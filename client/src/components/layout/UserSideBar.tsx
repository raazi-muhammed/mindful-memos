import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { IoIosPerson, IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

export enum SideBarItem {
    PROFILE = "PROFILE",
    SETTINGS = "SETTINGS",
}
const UserSideBar = ({ active }: { active: SideBarItem }) => {
    return (
        <Card className="flex mx-auto p-2 w-fit mt-8 mb-8">
            <Link to={"/profile"}>
                <Button
                    className="flex flex-col h-16"
                    variant={
                        active === SideBarItem.PROFILE ? "default" : "ghost"
                    }
                >
                    <IoIosPerson size="2em" />
                    <span className="text-xs">Profile</span>
                </Button>
            </Link>
            <Link to={"/settings"}>
                <Button
                    className="flex flex-col h-16"
                    variant={
                        active === SideBarItem.SETTINGS ? "default" : "ghost"
                    }
                >
                    <IoIosSettings size="2em" />
                    <span className="text-xs">Settings</span>
                </Button>
            </Link>
        </Card>
    );
};

export default UserSideBar;
