import AdminLoginForm from "@/components/custom/AdminLoginForm";
import Container from "@/components/layout/Container";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function AdminLoginPage() {
    return (
        <Container className="grid place-items-center h-screen">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle>Admin</CardTitle>
                    <CardDescription>Login to your page</CardDescription>
                </CardHeader>
                <CardContent>
                    <AdminLoginForm />
                </CardContent>
            </Card>
        </Container>
    );
}
