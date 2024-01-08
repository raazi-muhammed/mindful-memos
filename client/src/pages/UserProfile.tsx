import { EditProfile } from "@/components/user/EditProfile";
import Container from "@/components/layout/Container";
import UserSideBar, { SideBarItem } from "@/components/layout/UserSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { IoIosPerson } from "react-icons/io";
import Spinner from "@/components/utils/Spinner";

const UserProfile = () => {
    const response = trpc.user.profile.useQuery();
    const userData = response?.data as UserType;

    const refreshPage = () => {
        response.refetch();
    };

    return (
        <Container>
            <UserSideBar active={SideBarItem.PROFILE} />
            <section className="w-full my-auto">
                <Spinner className="py-36" loading={response.isLoading} />
                {userData ? (
                    <section className="grid gap-4 max-w-md mx-auto">
                        <Avatar className="mx-auto">
                            <AvatarImage src={userData.avatar || ""} />
                            <AvatarFallback>
                                <IoIosPerson size="3em" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="bg-accent rounded px-6 py-2">
                            <p className="text-sm">Name</p>
                            <p> {userData.username}</p>
                        </div>
                        <div className="bg-accent rounded px-6 py-2">
                            <p className="text-sm">Email</p>
                            <p> {userData.email}</p>
                        </div>

                        <EditProfile
                            refreshPage={refreshPage}
                            userDetails={userData}
                        />
                    </section>
                ) : null}
            </section>
        </Container>
    );
};

export default UserProfile;
