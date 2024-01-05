import API from "@/lib/API";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const userId = "65980087e960c66b8d8b2ef0";
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        API.get(`/user/profile?id=${userId}`)
            .then((response) => {
                console.log(response);
                setUserData(response.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <p>UserProfile</p>
            {userData ? <p>{JSON.stringify(userData)}</p> : null}
        </div>
    );
};

export default UserProfile;
