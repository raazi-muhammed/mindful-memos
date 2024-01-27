import { EditProfile } from "@/components/user/EditProfile";
import Container from "@/components/layout/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";
import { IoIosPerson } from "react-icons/io";
import Spinner from "@/components/utils/Spinner";
import NavBar from "@/components/layout/NavBar";

const UserProfile = () => {
    const response = trpc.user.profile.useQuery();
    const userData = response?.data as UserType;

    const refreshPage = () => {
        response.refetch();
    };

    return (
        <Container>
            <NavBar />
            <section className="w-full my-auto">
                <Spinner className="py-36" loading={response.isLoading} />
                {userData ? (
                    <section className="grid gap-4 max-w-md mx-auto">
                        <Avatar className="mx-auto w-32 h-32">
                            <AvatarImage src={userData.avatar || ""} />
                            <AvatarFallback>
                                <IoIosPerson size="3em" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="bg-card rounded px-6 py-4">
                            <p className="text-xs text-muted-foreground">
                                Name
                            </p>
                            <p className="text-lg"> {userData.username}</p>
                        </div>
                        <div className="bg-card rounded px-6 py-4">
                            <p className="text-xs text-muted-foreground">
                                Email
                            </p>
                            <p className="text-lg"> {userData.email}</p>
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
