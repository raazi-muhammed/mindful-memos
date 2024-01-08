import ClipLoader from "react-spinners/ClipLoader";
import { cn } from "@/lib/utils";

type Props = { loading: boolean; className?: string };

const Spinner = ({ loading, className }: Props) => {
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
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;
