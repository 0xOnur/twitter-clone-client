import { createSlice } from "@reduxjs/toolkit";
import * as userApi from "../../api/userApi";
import {IUser} from "@customTypes/UserTypes"

export interface UserState {
    isAuthenticated: boolean;
    user: IUser;
    accessToken: string | null;
    refreshToken: string | null;
    isPending: boolean;
    error: {
        message: string | null;
    } | null
  }

const initialState: UserState = {
    isAuthenticated:false,
    user: {
        _id: "",
        username: "",
        displayName: "",
        email: "",
        isVerified: false,
        bio: "",
        location: "",
        avatar: "",
        cover: "",
        following:[],
        createdAt: "",
        updatedAt: ""
    },
    accessToken: null,
    refreshToken: null,
    isPending: false,
    error: {
        message: null
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Create user
        builder.addCase(userApi.createUser.pending, (state, action) => {
            state.isPending = true;
        });
        builder.addCase(userApi.createUser.fulfilled, (state, action) => {
            state.isPending = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.tokens.accessToken;
            state.refreshToken = action.payload.tokens.refreshToken;
        });
        builder.addCase(userApi.createUser.rejected, (state, action) => {
            state.isPending = false;
            state.error = action.payload ? {message: action.payload as string} : {message: "Error creating user"};
        });
        // Login user
        builder.addCase(userApi.loginUser.pending, (state, action) => {
            state.isPending = true;
        });
        builder.addCase(userApi.loginUser.fulfilled, (state, action) => {
            state.isPending = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.tokens.accessToken;
            state.refreshToken = action.payload.tokens.refreshToken;
        });
        builder.addCase(userApi.loginUser.rejected, (state, action) => {
            state.isPending = false;
            state.error = action.payload ? {message: action.payload as string} : {message: "Error logging in user"};
        });
        // Get new accessToken
        builder.addCase(userApi.updateAccessToken.pending, (state, action) => {
            state.isPending = true;
        });
        builder.addCase(userApi.updateAccessToken.fulfilled, (state, action) => {
            state.isPending = false;
            state.error = null;
            state.accessToken = action.payload;
        });
        builder.addCase(userApi.updateAccessToken.rejected, (state, action) => {
            state.isPending = false;
            state.error = action.payload ? {message: action.payload as string} : {message: "Error getting new access token"};
        });
        // Update User
        builder.addCase(userApi.updateRedux.fulfilled, (state, action) => {
            state.isPending = false;
            state.error = null;
            state.user = action.payload;
        });
        builder.addCase(userApi.updateRedux.rejected, (state, action) => {
            state.isPending = false;
            state.error = action.payload ? {message: action.payload as string} : {message: "Error updating user"};
        });
    }
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;