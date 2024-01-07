import { NoteType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { note: NoteType };

const NoteCard = ({ note }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{note.content}</p>
            </CardContent>
        </Card>
    );
};

export default NoteCard;
