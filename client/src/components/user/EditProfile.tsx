import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types/types";
import { SyntheticEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { convertToBase64 } from "@/utils/converter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { IoIosPerson } from "react-icons/io";

export function EditProfile({
    refreshPage,
    userDetails,
}: {
    refreshPage: () => void;
    userDetails: UserType;
}) {
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
                refreshPage();
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
        <Drawer>
            <DrawerTrigger>
                <Button variant="secondary">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-xl w-full mx-auto max-h-[95vh] align-middle">
                <DrawerHeader className="px-8">
                    <DrawerTitle>Edit Profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="px-8">
                    <Avatar className="mx-auto w-36 h-36">
                        <AvatarImage src={imageBase64} />
                        <AvatarFallback>
                            <IoIosPerson size="5em" />
                        </AvatarFallback>
                    </Avatar>

                    <form onSubmit={onSubmit} className="grid gap-4 py-4">
                        <div className="items-center gap-4">
                            <Label htmlFor="name" className="text-right mb-2">
                                Email
                            </Label>
                            <Input
                                disabled={true}
                                value={userDetails.email}
                                className="col-span-3"
                            />
                        </div>
                        <div className="items-center gap-4">
                            <Label
                                htmlFor="username"
                                className="text-right mb-2"
                            >
                                Username
                            </Label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="col-span-3"
                            />
                        </div>

                        <div className="items-center gap-4">
                            <Label
                                htmlFor="username"
                                className="text-right mb-2"
                            >
                                Avatar
                            </Label>
                            <Input
                                onChange={(e) =>
                                    onFileChange(
                                        e.target.files
                                            ? e.target.files[0]
                                            : null
                                    )
                                }
                                type="file"
                                className="col-span-3"
                            />
                        </div>
                        <Button type="submit">Save changes</Button>
                        <DrawerClose>
                            <Button
                                size="default"
                                className="w-full"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                    </form>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
