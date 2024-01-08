import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailListingType } from "@/types/types";
type Props = { mailList: MailListingType };

const MailListCard = ({ mailList }: Props) => {
    return (
        <Card className="min-w-56">
            <CardHeader>
                <p className="text-muted-foreground text-sm">
                    {mailList.user.email}
                </p>
            </CardHeader>
            <CardContent className="-mt-4">
                <p className="font-bold">{mailList.note.title}</p>
                <p className="text-sm">{mailList.note.content}</p>
            </CardContent>
        </Card>
    );
};

export default MailListCard;
