import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// Login user
export const loginUser = createAsyncThunk(
    "loginUser",
    async (user: any, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/login", user);
            const data = response.data;
            return data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Get new accessToken
export const updateAccessToken = createAsyncThunk(
    "getNewToken",
    async (userId: any, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/update-token", {userId});
            const accessToken = response.data.accessToken;
            return accessToken;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// Create a user
export const createUser = createAsyncThunk(
    "user/createUser",
    async (formData: FormData, thunkAPI) => {
      try {
        const response = await axiosInstance.post("/user/create-user", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        const data = response.data;
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

// Get a user with username
export const getUser = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/user/get-user/${username}`);
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data);
    }
};

export const searchUser = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/user/search-user/${username}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
};