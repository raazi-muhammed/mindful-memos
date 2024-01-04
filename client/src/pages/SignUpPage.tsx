import SignUpForm from "@/components/custom/SignUpForm";
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
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
            <CardFooter className="grid place-items-center">
                <Link to="/login">login</Link>
            </CardFooter>
        </Card>
    );
}
