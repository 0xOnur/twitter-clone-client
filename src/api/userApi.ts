import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import axios from "axios";

// Login user
export const loginUser = createAsyncThunk(
  "loginUser",
  async (user: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/login", user);
      const data = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update redux user for follow/unfollow functionality
export const updateRedux = createAsyncThunk(
  "user/updateRedux",
  async (username: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/user/get-user/${username}`);
      const data = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update User
export const updateUser = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put("/user/update-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.data;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get new accessToken
export const updateAccessToken = createAsyncThunk(
  "getNewToken",
  async (userId: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/update-token", {
        userId,
      });
      const accessToken = response.data;
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
    } catch (error: any) {
      console.error("Error creating user:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Check username is available
export const usernameIsAvailable = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/username-available/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Check email is available
export const emailIsAvailable = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/email-available/${email}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Check username exist
export const usernameExist = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/username-exist/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get a user with username
export const getUser = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/user/get-user/${username}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Search user with username
export const searchUser = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/user/search-user/${username}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Suggest new users
export const whoToFollow = async (limit: number) => {
  try {
    const response = await axiosInstance.get(`/user/who-to-follow/${limit}`);
    return response.data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

// Follow User
export const followUser = async (userId: string) => {
  try {
    const response = await axiosInstance.put(`/user/follow-user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Unfollow User
export const unFollowUser = async (userId: string) => {
  try {
    const response = await axiosInstance.put(`/user/unfollow-user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get User Followings
export const getUserFollowings =async (username:string) => {
  try {
    const response = await axiosInstance.get(`/user/get-user-followings/${username}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// Get User Followers
export const getUserFollowers =async (username:string) => {
  try {
    const response = await axiosInstance.get(`/user/get-user-followers/${username}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error)
  }
}

// Get user Tweets
export const getUserTweets = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/get-user-tweets/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get  Media only User Tweets
export const getMediaOnlyUserTweets = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/get-user-media-only-tweets/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get User Replies
export const getUserReplies = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/get-user-replies/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};

// Get User Likes
export const getUserLikes = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/user/get-user-likes/${username}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  }
};
