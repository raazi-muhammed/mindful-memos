import { RootState } from "@/app/store";
import { setUsersList } from "@/features/userList/usersListSlice";
import AddUser from "@/components/admin/AddUser";
import UserCard from "@/components/admin/UserCard";
import AdminSideBar, {
    AdminSideBarItem,
} from "@/components/layout/AdminSideBar";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Heading from "@/components/utils/Heading";
import Spinner from "@/components/utils/Spinner";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";

const AdminHomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<UserType[]>([]);
    const users = useSelector((state: RootState) => state.usersList.users);

    const response = trpc.admin.users.useQuery();

    const fetchedUsers = response?.data as UserType[] | [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUsersList(fetchedUsers));
    }, [response.isInitialLoading]);

    const handleSearchInputChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);

        const newUsers = users.filter((user) => {
            if (user.email.match(searchTerm) || user.username.match(searchTerm))
                return user;
        });
        setSearchResults(newUsers);
    };

    return (
        <main>
            <Container>
                <AdminSideBar active={AdminSideBarItem.USERS} />
                <section className="flex justify-between">
                    <Heading>Users</Heading>
                    <div className="flex gap-2">
                        <Input
                            className="max-w-56"
                            value={searchTerm}
                            onChange={(e) =>
                                handleSearchInputChange(e.target.value)
                            }
                        />
                        <Button className="aspect-square grid -ms-2">
                            <IoIosSearch size="1.3em" />
                        </Button>
                        <AddUser />
                    </div>
                </section>
                <Spinner className="py-36" loading={response.isLoading} />
                {searchTerm ? (
                    <>
                        <p>Search results</p>
                        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {searchResults.map((user) => (
                                <UserCard key={user._id} user={user} />
                            ))}
                        </section>
                    </>
                ) : (
                    <>
                        {users ? (
                            <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {users.map((user) => (
                                    <UserCard key={user._id} user={user} />
                                ))}
                            </section>
                        ) : null}
                    </>
                )}
            </Container>
        </main>
    );
};

export default AdminHomePage;
