import axios from "axios";
const server = "http://localhost:4000";

axios.defaults.baseURL = server;
type Options = {
    toaster?: ({
        title,
        description,
    }: {
        title?: string;
        description: string;
    }) => void;
};

export async function get(url: string, params = {}, options: Options = {}) {
    return axios({
        url,
        method: "GET",
        withCredentials: true,
        params,
    })
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            if (options?.toaster) {
                options.toaster({
                    description:
                        err.response?.data?.message || "Invalid Details",
                });
            }
        });
}

export async function post(url: string, data = {}, options: Options = {}) {
    return axios({
        url,
        method: "POST",
        withCredentials: true,
        data,
    })
        .then((res) => {
            if (options?.toaster) {
                options.toaster({
                    description: res?.data?.message || "Successful",
                });
            }
            return res.data;
        })
        .catch((err) => {
            console.log(err);
            if (options?.toaster) {
                options.toaster({
                    description:
                        err.response?.data?.message || "Invalid Details",
                });
            }
            return err.response.data;
        });
}

export default {
    get,
    post,
};
