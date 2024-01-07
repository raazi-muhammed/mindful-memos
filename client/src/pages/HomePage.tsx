import { useSelector } from "react-redux";

import NavBar from "@/components/layout/NavBar";
import CreateNewNote from "@/components/custom/CreateNewNote";

const HomePage = () => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <div>
            <NavBar />
            <p>Home Page</p>
            <CreateNewNote />
            <p>{JSON.stringify(user)}</p>
        </div>
    );
};

export default HomePage;
