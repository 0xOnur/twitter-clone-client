import axios from "axios";
import store from "@redux/config/store";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add accessToken to request header
        const accessToken = store.getState().user.accessToken;
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        };
        // Add refreshToken to request header for updating accessToken
        const refreshToken = store.getState().user.refreshToken;
        if (refreshToken && config.url === "/user/update-token") {
            config.headers["x-refresh-token"] = refreshToken;
        };

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;