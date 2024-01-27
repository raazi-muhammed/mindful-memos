import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <p className={cn("text-5xl p-2 font-heading", className)}>{children}</p>
    );
};

export default Heading;
