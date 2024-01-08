import UserCard from "@/components/admin/UserCard";
import AdminSideBar, {
    AdminSideBarItem,
} from "@/components/layout/AdminSideBar";
import Container from "@/components/layout/Container";
import Heading from "@/components/utils/Heading";
import Spinner from "@/components/utils/Spinner";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const AdminHomePage = () => {
    const response = trpc.admin.users.useQuery();
    const users = response?.data as UserType[] | [];

    return (
        <main>
            <Container>
                <AdminSideBar active={AdminSideBarItem.USERS} />
                <Heading>Users</Heading>
                <Spinner className="py-36" loading={response.isLoading} />
                {users ? (
                    <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))}
                    </section>
                ) : null}
            </Container>
        </main>
    );
};

export default AdminHomePage;
