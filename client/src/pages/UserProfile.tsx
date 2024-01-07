import { EditProfile } from "@/components/user/EditProfile";
import Container from "@/components/layout/Container";
import UserSideBar, { SideBarItem } from "@/components/layout/UserSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const UserProfile = () => {
    const response = trpc.user.profile.useQuery();
    const userData = response?.data as UserType;

    return (
        <Container className="flex align-middle h-screen">
            <UserSideBar active={SideBarItem.PROFILE} />
            <section className="w-full my-auto">
                {userData ? (
                    <section className="grid gap-4 w-96 mx-auto">
                        <Avatar className="mx-auto">
                            <AvatarImage src={userData.avatar || ""} />
                            <AvatarFallback>IMG</AvatarFallback>
                        </Avatar>

                        <div className="bg-accent rounded px-6 py-2">
                            <p className="text-sm">Name</p>
                            <p> {userData.username}</p>
                        </div>
                        <div className="bg-accent rounded px-6 py-2">
                            <p className="text-sm">Email</p>
                            <p> {userData.email}</p>
                        </div>

                        <EditProfile userDetails={userData} />
                    </section>
                ) : response.isLoading ? (
                    <p className="text-center mx-auto">Loading...</p>
                ) : (
                    <p className="text-center mx-auto">An Error Occurred</p>
                )}
            </section>
        </Container>
    );
};

export default UserProfile;
