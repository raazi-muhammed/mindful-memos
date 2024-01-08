import ClipLoader from "react-spinners/ClipLoader";
import { cn } from "@/lib/utils";

type Props = {
    loading: boolean;
    className?: string;
    size?: number;
    variant?: "default" | "submit";
};

const Spinner = ({
    loading,
    className,
    size = 25,
    variant = "default",
}: Props) => {
    if (variant === "submit") {
        return (
            <div
                className={
                    loading
                        ? cn(
                              "w-fit mx-2 h-full flex align-middle justify-center",
                              className
                          )
                        : ""
                }
            >
                <ClipLoader
                    color="white"
                    className="my-auto"
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    } else {
        return (
            <div
                className={
                    loading
                        ? cn(
                              "w-full h-full flex align-middle justify-center",
                              className
                          )
                        : ""
                }
            >
                <ClipLoader
                    color="white"
                    className="my-auto"
                    loading={loading}
                    size={size}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
};

export default Spinner;
