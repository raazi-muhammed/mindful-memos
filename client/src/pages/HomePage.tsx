import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserProfileDropDown } from "@/components/custom/UserProfileDropDown";

const HomePage = () => {
    return (
        <div>
            <p>Home Page</p>
            <Link to="login">
                <Button>login</Button>
            </Link>
            <UserProfileDropDown />
        </div>
    );
};

export default HomePage;
