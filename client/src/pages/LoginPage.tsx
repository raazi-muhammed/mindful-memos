import LoginForm from "@/components/custom/LoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your page</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="grid place-items-center">
                <Link to="/sign-up">signup</Link>
                <Link to="/">go home</Link>
            </CardFooter>
        </Card>
    );
}
