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
import { trpc } from "@/lib/trpc";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../utils/Spinner";

const formSchema = z.object({
    email: z.string().email().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6),
});

export default function LoginForm() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const userLogin = trpc.user.login.useMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { isDirty, isValid } = form.formState;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const canSubmitForm = !isDirty || !isValid || isSubmitting;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        userLogin
            .mutateAsync(values)
            .then((res) => {
                if (res) {
                    Cookies.set("__crud_app", res);
                    navigate("/");
                    window.location.reload();
                } else {
                    console.log("no res");
                }
                toast({ description: "Logged In" });
            })
            .catch((error) => {
                const errorMessage = error?.message;
                if (errorMessage.toLowerCase().includes("password")) {
                    form.setError("password", { message: errorMessage });
                } else if (errorMessage.toLowerCase().includes("user")) {
                    form.setError("email", { message: errorMessage });
                } else {
                    toast({ description: error?.message });
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

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
