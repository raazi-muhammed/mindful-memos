import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
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
    title: z.string().min(5, {
        message: "Username must be at least 2 char.",
    }),
    content: z.string().min(5),
});

export default function NewNoteForm() {
    const { toast } = useToast();
    const addNote = trpc.user.addNote.useMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const { isDirty, isValid } = form.formState;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const canSubmitForm = !isDirty || !isValid || isSubmitting;

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        addNote
            .mutateAsync(values)
            .then(() => {
                toast({ description: "Note Added" });
                form.reset();
            })
            .catch((error) => {
                toast({ description: error?.message });
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
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
                    <span>Add Note</span>
                </Button>
            </form>
        </Form>
    );
}
