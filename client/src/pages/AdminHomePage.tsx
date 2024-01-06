import UserCard from "@/components/custom/UserCard";
import API from "@/lib/API";
import { UserType } from "@/types/types";
import { useEffect, useState } from "react";

const AdminHomePage = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    useEffect(() => {
        API.getUsersAdmin().then((response) => {
            setUsers(response.users as UserType[]);
        });
    }, []);
    return (
        <main>
            <p>Users</p>
            <section className="grid gap-4 grid-cols-2">
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </section>
        </main>
    );
};

export default AdminHomePage;
