import { NoteType } from "@/types/types";
import { Dialog } from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { AlertDialog } from "@/components/ui/alert-dialog";
import NoteCardDropDown from "./NoteCardDropDown";

type Props = { note: NoteType };

const NoteCard = ({ note }: Props) => {
    return (
        <Card>
            <AlertDialog>
                <Dialog>
                    <CardHeader>
                        <div className="flex justify-between align-middle">
                            <p className="my-auto text-xl font-semibold">
                                {note.title}
                            </p>
                            <NoteCardDropDown note={note} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="-mt-6">{note.content}</p>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-muted-foreground">
                            {moment(note.createdAt).startOf("hour").fromNow()}
                        </p>
                    </CardFooter>
                </Dialog>
            </AlertDialog>
        </Card>
    );
};

export default NoteCard;
