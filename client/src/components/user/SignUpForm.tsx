import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
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
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import Spinner from "../utils/Spinner";

const formSchema = z.object({
    email: z.string().email().min(10, {
        message: "Username must be at least 2 char.",
    }),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export default function SignUpForm() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const userSignUp = trpc.user.signUp.useMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });
    const { isDirty, isValid } = form.formState;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const canSubmitForm = !isDirty || !isValid || isSubmitting;

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password !== values.confirmPassword) {
            form.setError("confirmPassword", {
                message: "Confirm password doesn't match",
            });
            return;
        }
        setIsSubmitting(true);

        userSignUp
            .mutateAsync(values)
            .then((res) => {
                toast({ description: "Account Created" });
                navigate("/login");
            })
            .catch((error) => {
                const errorMessage = error?.message;
                if (errorMessage.toLowerCase().includes("user")) {
                    form.setError("email", { message: errorMessage });
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                    <span>Sign Up</span>
                </Button>
            </form>
        </Form>
    );
}
