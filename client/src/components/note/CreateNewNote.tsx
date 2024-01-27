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
import NewNoteForm from "./NewNoteForm";

const CreateNewNote = () => {
    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant="secondary">New Note</Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-xl w-full mx-auto max-h-[95vh] align-middle">
                <DrawerHeader className="px-8">
                    <DrawerTitle>Add a new Note</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="px-8">
                    <NewNoteForm />
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
        </Drawer>
    );
};

export default CreateNewNote;
