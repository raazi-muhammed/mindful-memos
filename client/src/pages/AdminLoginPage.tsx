import AdminLoginForm from "@/components/custom/AdminLoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export function AdminLoginPage() {
    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle>Admin</CardTitle>
                <CardDescription>Login to your page</CardDescription>
            </CardHeader>
            <CardContent>
                <AdminLoginForm />
            </CardContent>
            <CardFooter className="grid place-items-center">
                <Link to="/sign-up">signup</Link>
                <Link to="/">go home</Link>
            </CardFooter>
        </Card>
    );
}
