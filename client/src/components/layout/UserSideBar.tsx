import { Button } from "../ui/button";
import { Card } from "../ui/card";

export enum SideBarItem {
    PROFILE = "PROFILE",
    SETTINGS = "SETTINGS",
}
const UserSideBar = ({ active }: { active: SideBarItem }) => {
    return (
        <Card className="w-56 grid my-auto p-2">
            <Button
                variant={active === SideBarItem.PROFILE ? "default" : "ghost"}
            >
                Profile
            </Button>
            <Button
                variant={active === SideBarItem.SETTINGS ? "default" : "ghost"}
            >
                Settings
            </Button>
        </Card>
    );
};

export default UserSideBar;
