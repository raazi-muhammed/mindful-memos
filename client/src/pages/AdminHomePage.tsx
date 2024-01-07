import UserCard from "@/components/custom/UserCard";
import Container from "@/components/layout/Container";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const AdminHomePage = () => {
    const response = trpc.admin.users.useQuery();
    console.log(response?.data);

    const users = response?.data as UserType[] | [];
    return (
        <main>
            <Container>
                <p className="text-xl">Users</p>
                {users ? (
                    <section className="grid gap-4 grid-cols-3">
                        {users.map((user) => (
                            <UserCard user={user} />
                        ))}
                    </section>
                ) : null}
            </Container>
        </main>
    );
};

export default AdminHomePage;
