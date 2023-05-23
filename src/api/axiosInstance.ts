import axios from "axios";
import store from "@redux/config/store";
import { updateAccessToken } from "./userApi";
import { logoutUser } from "@redux/slices/userSlice";

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
    }
    // Add refreshToken to request header for updating accessToken
    const refreshToken = store.getState().user.refreshToken;
    if (refreshToken && config.url === "/user/update-token") {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "/user/update-token"
    ) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const userId = store.getState().user.user?._id;
      const response = await store.dispatch(updateAccessToken(userId));
      const accessToken = response.payload;
      if (accessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
