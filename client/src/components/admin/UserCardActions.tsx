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
import { Button } from "../ui/button";
import { UserType } from "@/types/types";
import { trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";
import {
    deleteUserById,
    setUsersBlockState,
} from "@/features/userList/usersListSlice";
import { useDispatch } from "react-redux";
import { EditUser } from "./EditUser";

type Props = { user: UserType };

const UserCardActions = ({ user }: Props) => {
    const setUserBlock = trpc.admin.setUserBlock.useMutation();
    const deleteUser = trpc.admin.deleteUserById.useMutation();
    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleDeleteUser = () => {
        deleteUser
            .mutateAsync(user._id)
            .then(() => {
                toast({ description: "User deleted" });
                dispatch(deleteUserById(user._id));
            })
            .catch(() => {
                toast({ description: "Deleting failed" });
            });
    };

    const handleBlockUser = () => {
        dispatch(setUsersBlockState({ userId: user._id, blockState: true }));
        setUserBlock
            .mutateAsync({ userId: user._id, blockState: true })
            .then(() => {
                toast({ description: "Blocked" });
            })
            .catch(() => {
                toast({ description: "Blocking failed" });
                dispatch(
                    setUsersBlockState({ userId: user._id, blockState: false })
                );
            });
    };
    const handleUnBlockUser = () => {
        dispatch(setUsersBlockState({ userId: user._id, blockState: false }));
        setUserBlock
            .mutateAsync({ userId: user._id, blockState: false })
            .then(() => {
                toast({ description: "Unblocked" });
            })
            .catch(() => {
                toast({ description: "Unblocking failed" });
                dispatch(
                    setUsersBlockState({ userId: user._id, blockState: true })
                );
            });
    };

    return (
        <>
            <EditUser userDetails={user} />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="secondary">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {user.isBlocked ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="border-2 border-green-700"
                            variant="secondary"
                        >
                            Unblock
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleUnBlockUser}>
                                Unblock
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="border-2 border-destructive"
                            variant="secondary"
                        >
                            Block
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleBlockUser}>
                                Block
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
};

export default UserCardActions;
