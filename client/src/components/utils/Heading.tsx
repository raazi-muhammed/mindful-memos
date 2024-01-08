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
        <p className={cn("text-3xl p-2 font-bold", className)}>{children}</p>
    );
};

export default Heading;
