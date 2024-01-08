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
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BsThreeDots } from "react-icons/bs";
import { trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";
import { NoteType } from "@/types/types";

type Props = { note: NoteType };

const NoteCardDropDown = ({ note }: Props) => {
    const deleteNote = trpc.user.deleteNote.useMutation();
    const { toast } = useToast();

    const handleNoteDelete = () => {
        deleteNote
            .mutateAsync(note._id)
            .then(() => {
                toast({ description: "Note deleted" });
            })
            .catch((error) => {
                toast({ description: error?.message });
            });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <BsThreeDots size="1.2em" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                    <DialogDescription>
                        Make changes to your note here. Click save when you're
                        done.
                    </DialogDescription>
                </DialogHeader>
                <EditNoteForm note={note} />
            </DialogContent>
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
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    );
};

export default NoteCardDropDown;
