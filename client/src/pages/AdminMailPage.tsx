import MailListCard from "@/components/admin/MailListCard";
import AdminSideBar, {
    AdminSideBarItem,
} from "@/components/layout/AdminSideBar";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/utils/Heading";
import Spinner from "@/components/utils/Spinner";
import { trpc } from "@/lib/trpc";
import { MailListingType } from "@/types/types";

const AdminMailPage = () => {
    const response = trpc.admin.getMailingList.useQuery();
    const mailList = response?.data as MailListingType[];
    const sendMail = trpc.admin.sendMail.useMutation();
    const handleSendMail = () => {
        sendMail.mutateAsync().then((res) => {
            console.log(res);
        });
    };
    return (
        <main>
            <Container>
                <AdminSideBar active={AdminSideBarItem.MAILS} />
                <section className="flex justify-between">
                    <Heading>Mail Preview</Heading>
                    <Button onClick={handleSendMail} variant="secondary">
                        Send Test Mail
                    </Button>
                </section>
                <Spinner className="py-36" loading={response.isLoading} />
                {mailList ? (
                    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {mailList.map((list) => (
                            <MailListCard key={list.note._id} mailList={list} />
                        ))}
                    </section>
                ) : null}
            </Container>
        </main>
    );
};

export default AdminMailPage;
