import { UserType } from "@/types/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosPerson } from "react-icons/io";
import UserCardActions from "./UserCardActions";

type Props = { user: UserType };

const UserCard = ({ user }: Props) => {
    return (
        <Card className="min-w-56 flex justify-between align-middle">
            <CardHeader>
                <Avatar className="mx-auto">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>
                        <IoIosPerson size="2em" />
                    </AvatarFallback>
                </Avatar>
            </CardHeader>
            <div className="w-full flex flex-wrap p-4">
                <CardContent className="flex flex-col justify-center -ms-8">
                    <p className="mt-4">{user.username}</p>
                    <p className="text-sm mb-0">{user.email}</p>
                </CardContent>
                <CardFooter className="ms-auto me-0 my-auto p-0 gap-2">
                    <UserCardActions user={user} />
                </CardFooter>
            </div>
        </Card>
    );
};

export default UserCard;
