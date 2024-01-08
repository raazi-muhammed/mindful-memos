import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { MailListingType } from "@/types/types";
type Props = { mailList: MailListingType };

const MailListCard = ({ mailList }: Props) => {
    return (
        <Card className="min-w-56">
            <CardHeader>
                <p>{mailList.email}</p>
            </CardHeader>
            <CardContent>
                <p>{mailList.note.title}</p>
                <p>{mailList.note.content}</p>
            </CardContent>
        </Card>
    );
};

export default MailListCard;
