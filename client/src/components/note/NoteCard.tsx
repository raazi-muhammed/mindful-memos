import { NoteType } from "@/types/types";
import { Drawer } from "@/components/ui/drawer";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import moment from "moment";
import { AlertDialog } from "@/components/ui/alert-dialog";
import NoteCardDropDown from "./NoteCardDropDown";
import { FaLightbulb } from "react-icons/fa";

type Props = { note: NoteType };

const NoteCard = ({ note }: Props) => {
    return (
        <Card className="mt-5">
            <AlertDialog>
                <Drawer>
                    <CardHeader className="p-2">
                        <section className="flex justify-between relative">
                            <div className="bg-foreground aspect-square rounded-full w-16 flex absolute -top-8 left-2">
                                <FaLightbulb
                                    className="text-white m-auto"
                                    size="1.8em"
                                />
                            </div>
                            <div />
                            <section className="flex align-middle my-auto h-fit gap-4">
                                <p className="text-xs text-secondary my-auto">
                                    {moment(note.createdAt)
                                        .startOf("hour")
                                        .fromNow()}
                                </p>
                                <NoteCardDropDown note={note} />
                            </section>
                        </section>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between align-middle">
                            <p className="my-auto text-2xl font-heading leading-8">
                                {note.title}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="-mt-2">{note.content}</p>
                    </CardFooter>
                </Drawer>
            </AlertDialog>
        </Card>
    );
};

export default NoteCard;
