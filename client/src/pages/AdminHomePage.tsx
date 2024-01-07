import UserCard from "@/components/admin/UserCard";
import Container from "@/components/layout/Container";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const AdminHomePage = () => {
    const response = trpc.admin.users.useQuery();
    const users = response?.data as UserType[] | [];

    return (
        <main>
            <Container>
                <p className="text-3xl p-2 font-bold">Users</p>
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
