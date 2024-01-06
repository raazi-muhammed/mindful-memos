import { useEffect, useState } from "react";
import API from "../lib/API";

const UserProfile = () => {
    const userId = "65980087e960c66b8d8b2ef0";
    const [userData, setUserData] = useState<any | null>(null);
    useEffect(() => {
        API.getProfile(userId).then((data) => {
            console.log(data);
            setUserData(data);
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
