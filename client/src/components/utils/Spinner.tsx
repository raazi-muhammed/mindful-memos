import ClipLoader from "react-spinners/ClipLoader";
import { cn } from "@/lib/utils";

type Props = { loading: boolean; className?: string; size?: number };

const Spinner = ({ loading, className, size = 25 }: Props) => {
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
};

export default Spinner;
