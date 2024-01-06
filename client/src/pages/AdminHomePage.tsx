import UserCard from "@/components/custom/UserCard";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const AdminHomePage = () => {
    const response = trpc.admin.users.useQuery();
    console.log(response?.data);

    const users = response?.data as UserType[] | [];
    return (
        <main>
            <p>Users</p>
            {users ? (
                <section className="grid gap-4 grid-cols-2">
                    {users.map((user) => (
                        <UserCard user={user} />
                    ))}
                </section>
            ) : null}
        </main>
    );
};

export default AdminHomePage;
