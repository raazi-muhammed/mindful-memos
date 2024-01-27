import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "./AddUserForm";

const AddUser = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Add user</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full p-6">
                <DialogHeader className="p-2">
                    <DialogTitle>Add a new User</DialogTitle>
                </DialogHeader>
                <section className="p-2">
                    <AddUserForm />
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default AddUser;
