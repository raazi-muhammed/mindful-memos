import LoginForm from "@/components/user/LoginForm";
import Container from "@/components/layout/Container";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

export function LoginPage() {
    return (
        <Container className="grid place-items-center h-screen gap-2">
            <div className="max-w-md w-full">
                <div className="flex gap-2 align-middle justify-center my-4">
                    <FaLeaf className="my-auto text-primary" size="1.2em" />
                    <p className="text-primary font-semibold text-lg my-auto font-heading">
                        MindfulMemos
                    </p>
                </div>
                <Card className="w-full p-2">
                    <CardHeader className="px-9">
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login to your page</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                    <CardFooter className="grid place-items-center gap-2">
                        <Link
                            className="text-xs text-primary hover:underline"
                            to="/sign-up"
                        >
                            Sign Up
                        </Link>
                        <Link
                            className="text-xs text-primary hover:underline"
                            to="/"
                        >
                            Go Home
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </Container>
    );
}
