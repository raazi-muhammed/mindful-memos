import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types/types";
import { SyntheticEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { convertToBase64 } from "@/utils/converter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { IoIosPerson } from "react-icons/io";
import { useDispatch } from "react-redux";
import { editUser } from "@/app/usersListSlice";

export function EditUser({ userDetails }: { userDetails: UserType }) {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const userEditor = trpc.user.edit.useMutation();

    const [username, setUsername] = useState(userDetails.username);
    const [imageBase64, setimageBase64] = useState<string | undefined>(
        userDetails?.avatar
    );

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const values = {
            username,
            email: userDetails.email,
            avatar: imageBase64,
        };

        userEditor
            .mutateAsync(values)
            .then(() => {
                toast({ description: "Edited" });
                dispatch(editUser({ userId: userDetails._id, ...values }));
            })
            .catch((error) => {
                toast({ description: error?.message });
            });
    };
    const onFileChange = async (file: File | null) => {
        if (!file) return;
        const fileBase64 = await convertToBase64(file);
        console.log(fileBase64);
        setimageBase64(fileBase64 as string);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Avatar className="mx-auto w-36 h-36">
                    <AvatarImage src={imageBase64} />
                    <AvatarFallback>
                        <IoIosPerson size="5em" />
                    </AvatarFallback>
                </Avatar>

                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input
                            disabled={true}
                            value={userDetails.email}
                            className="col-span-3"
                        />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Avatar
                        </Label>
                        <Input
                            onChange={(e) =>
                                onFileChange(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
                            type="file"
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
