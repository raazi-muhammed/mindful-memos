import { NoteType } from "@/types/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { trpc } from "@/lib/trpc";
import { useToast } from "../ui/use-toast";
import NewNoteForm from "./NewNoteForm";
import EditNoteForm from "./EditNoteForm";

type Props = { note: NoteType };

const NoteCard = ({ note }: Props) => {
    const deleteNote = trpc.user.deleteNote.useMutation();
    const { toast } = useToast();

    const handleNoteDelete = () => {
        deleteNote
            .mutateAsync(note._id)
            .then((res) => {
                toast({ description: "Note deleted" });
            })
            .catch((error) => {
                toast({ description: error?.message });
            });
    };
    return (
        <Card>
            <AlertDialog>
                <Dialog>
                    <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{note.content}</p>
                    </CardContent>
                    <CardFooter>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Edit</Button>
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
                    </CardFooter>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Note</DialogTitle>
                            <DialogDescription>
                                Make changes to your note here. Click save when
                                you're done.
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
                                This action cannot be undone. This will delete
                                your note
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleNoteDelete}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </Dialog>
            </AlertDialog>
        </Card>
    );
};

export default NoteCard;
