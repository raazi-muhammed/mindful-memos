import { EditProfile } from "@/components/custom/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { UserType } from "@/types/types";

const UserProfile = () => {
    const response = trpc.user.profile.useQuery();
    const userData = response?.data as UserType;

    return (
        <div className="p-8">
            {userData ? (
                <section className="grid gap-4 w-96">
                    <Avatar className="mx-auto">
                        <AvatarImage src={userData.avatar || ""} />
                        <AvatarFallback>IMG</AvatarFallback>
                    </Avatar>

                    <div className="bg-slate-50 rounded px-6 py-2">
                        <p className="text-sm text-slate-400">Name</p>
                        <p> {userData.username}</p>
                    </div>
                    <div className="bg-slate-50 rounded px-6 py-2">
                        <p className="text-sm text-slate-400">Email</p>
                        <p> {userData.email}</p>
                    </div>

                    <EditProfile userDetails={userData} />
                </section>
            ) : response.isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>An Error Occurred</p>
            )}
        </div>
    );
};

export default UserProfile;
