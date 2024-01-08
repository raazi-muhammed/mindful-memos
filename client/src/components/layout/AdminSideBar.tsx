import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { IoIosMail, IoIosPerson } from "react-icons/io";

export enum AdminSideBarItem {
    USERS = "USERS",
    MAILS = "MAILS",
}
const AdminSideBar = ({ active }: { active: AdminSideBarItem }) => {
    return (
        <Card className="flex mx-auto p-2 w-fit mt-8">
            <Link to={"/admin/dashboard"}>
                <Button
                    className="flex flex-col h-16"
                    variant={
                        active === AdminSideBarItem.USERS ? "default" : "ghost"
                    }
                >
                    <IoIosPerson size="2em" />
                    <span className="text-xs">Users</span>
                </Button>
            </Link>
            <Link to={"/admin/mails"}>
                <Button
                    className="flex flex-col h-16"
                    variant={
                        active === AdminSideBarItem.MAILS ? "default" : "ghost"
                    }
                >
                    <IoIosMail size="2em" />
                    <span className="text-xs">Mails</span>
                </Button>
            </Link>
        </Card>
    );
};

export default AdminSideBar;
