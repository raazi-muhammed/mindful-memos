import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
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
import EditNoteForm from "./EditNoteForm";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { BsThreeDots } from "react-icons/bs";
import { trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";
import { NoteType } from "@/types/types";
import { RefreshHomePageContext } from "@/pages/HomePage";
import { useContext } from "react";

type Props = { note: NoteType };

const NoteCardDropDown = ({ note }: Props) => {
    const deleteNote = trpc.user.deleteNote.useMutation();
    const { refreshNotePage } = useContext(RefreshHomePageContext);
    const { toast } = useToast();

    const handleNoteDelete = () => {
        deleteNote
            .mutateAsync(note._id)
            .then(() => {
                toast({ description: "Note deleted" });
            })
            .catch((error) => {
                toast({ description: error?.message });
            })
            .finally(() => {
                refreshNotePage();
            });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="text-white"
                    >
                        <BsThreeDots size="1.2em" />
                        <span className="sr-only">Card actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DrawerTrigger asChild>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DrawerTrigger>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DrawerContent className="max-w-xl w-full mx-auto max-h-[95vh] align-middle">
                <DrawerHeader className="px-8">
                    <DrawerTitle>Edit Note</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your note here. Click save when you're
                        done.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="px-8">
                    <EditNoteForm note={note} />

                    <DrawerClose>
                        <Button
                            size="default"
                            className="w-full"
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete your note
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleNoteDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    );
};

export default NoteCardDropDown;
