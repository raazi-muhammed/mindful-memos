import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { trpc } from "@/lib/trpc";
import Spinner from "../utils/Spinner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/features/auth/userSlice";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5),
});

export default function AdminLoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const adminLogin = trpc.admin.login.useMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { isDirty, isValid } = form.formState;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const canSubmitForm = !isDirty || !isValid || isSubmitting;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        adminLogin
            .mutateAsync(values)
            .then(() => {
                toast({ description: "Logged In" });
                dispatch(setAdmin(values));
                navigate("/admin/dashboard");
            })
            .catch((error) => {
                const errorMessage = error?.message;
                if (errorMessage.toLowerCase().includes("password")) {
                    form.setError("password", { message: errorMessage });
                } else if (errorMessage.toLowerCase().includes("user")) {
                    form.setError("username", { message: errorMessage });
                } else {
                    toast({ description: error?.message });
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={canSubmitForm}
                    className="w-full"
                    type="submit"
                >
                    <Spinner
                        className="w-fit mx-2"
                        size={15}
                        loading={isSubmitting}
                    />
                    <span>Log In</span>
                </Button>
            </form>
        </Form>
    );
}
