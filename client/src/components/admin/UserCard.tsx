import { UserType } from "@/types/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";
import { IoIosPerson } from "react-icons/io";

type Props = { user: UserType; refreshPage: () => void };

const UserCard = ({ refreshPage, user }: Props) => {
    const setUserBlock = trpc.admin.setUserBlock.useMutation();
    const { toast } = useToast();

    const handleBlockUser = () => {
        setUserBlock
            .mutateAsync({ userId: user._id, blockState: true })
            .then(() => {
                toast({ description: "Blocked" });
                refreshPage();
            });
    };
    const handleUnBlockUser = () => {
        setUserBlock
            .mutateAsync({ userId: user._id, blockState: false })
            .then(() => {
                toast({ description: "Unblocked" });
                refreshPage();
            });
    };

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
                <CardFooter className="ms-auto me-0 my-auto p-0">
                    {user.isBlocked ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">Unblock</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {`Unblock ${user.username}?`}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to block?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleUnBlockUser}
                                    >
                                        Unblock
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="default">Block</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {`Block ${user.username}?`}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to block?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleBlockUser}
                                    >
                                        Block
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </CardFooter>
            </div>
        </Card>
    );
};

export default UserCard;
