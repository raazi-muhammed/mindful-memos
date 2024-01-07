import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NewNoteForm from "./NewNoteForm";

const CreateNewNote = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">New Note</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new Note</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <NewNoteForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewNote;
