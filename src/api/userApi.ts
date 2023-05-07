import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}

// Login user
export const loginUser = createAsyncThunk(
    "loginUser",
    async (user: any, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/login", user);
            const data = response.data;
            localStorage.setItem('accessToken', data.tokens.accessToken);
            localStorage.setItem('refreshToken', data.tokens.refreshToken);
            return data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    "logoutUser",
    async (userId: any, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/logout", {userId});
            const data = response.data;
            return data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// Create a user
export const createUser = createAsyncThunk(
    "user/createUser",
    async (formData: FormData, thunkAPI) => {
      try {
        const response = await axiosInstance.post("/user/create-user", formData);
        console.log(response);
        const data = response.data;
        localStorage.setItem('accessToken', data.tokens.accessToken)
        localStorage.setItem('refreshToken', data.tokens.refreshToken)
        return data;
      } catch (error:any) {
        console.error("Error creating user:", error);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Check username is available
export const usernameIsAvailable = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/user/username-available/${username}`);
        return response.data;
    } catch (error) {
        throw new Error("Error checking username");
    }
};

// Check email is available
export const emailIsAvailable = async (email: string) => {
    try {
        const response = await axiosInstance.get(`/user/email-available/${email}`);
        return response.data;
    } catch (error) {
        throw new Error("Error checking email");
    }
};

// Check username exist
export const usernameExist = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/user/username-exist/${username}`);
        return response.data;
    } catch (error) {
        throw new Error("Error checking username");
    }
};