import { useEffect, useState } from "react";
import API from "../lib/API";
import { UserType } from "@/types/types";
import { EditProfile } from "@/components/custom/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
    const userId = "65980087e960c66b8d8b2ef0";

    const [userData, setUserData] = useState<UserType | null>(null);
    useEffect(() => {
        API.getProfile(userId).then((data) => {
            console.log(data);
            setUserData(data.user as UserType);
        });
    }, []);

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
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
