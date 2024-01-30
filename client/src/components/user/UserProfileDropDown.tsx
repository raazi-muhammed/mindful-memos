import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/types";
import { IoIosPerson } from "react-icons/io";

export function UserProfileDropDown({ userData }: { userData: UserType }) {
    const { toast } = useToast();
    const navigate = useNavigate();
    const handleLogOut = () => {
        Cookies.remove("__crud_app");
        navigate("/login");
        window.location.reload();
        toast({ description: "Logged Out" });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <p className="me-3">{userData.username}</p>
                    <Avatar className="mx-auto w-8 h-8">
                        <AvatarImage
                            src={userData.avatar || ""}
                            alt="profile image"
                        />
                        <AvatarFallback className="bg-muted-foreground">
                            <IoIosPerson size="1.3em" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogOut}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
