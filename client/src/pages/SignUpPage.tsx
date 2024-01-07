import SignUpForm from "@/components/user/SignUpForm";
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

export function SignUpPage() {
    return (
        <Container className="grid place-items-center h-screen">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="grid place-items-center">
                    <Link
                        className="text-xs text-primary hover:underline"
                        to="/login"
                    >
                        Login
                    </Link>
                </CardFooter>
            </Card>
        </Container>
    );
}
