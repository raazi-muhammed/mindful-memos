import LoginForm from "@/components/custom/LoginForm";
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

export function LoginPage() {
    return (
        <Container className="grid place-items-center h-screen">
            <Card className="max-w-sm w-full">
                <CardHeader>
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
        </Container>
    );
}
