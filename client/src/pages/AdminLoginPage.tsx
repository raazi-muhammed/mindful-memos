import AdminLoginForm from "@/components/custom/AdminLoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
        </Card>
    );
}
