import { UserType } from "@/types/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = { user: UserType };

const UserCard = ({ user }: Props) => {
    return (
        <Card className="min-w-56">
            <CardHeader>
                <Avatar className="mx-auto">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent>
                <p>{user.username}</p>
                <p>{user.email}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button>Block</Button>
            </CardFooter>
        </Card>
    );
};

export default UserCard;
