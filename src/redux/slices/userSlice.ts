import { createSlice } from "@reduxjs/toolkit";
import * as userApi from "../../api/userApi";
import {IUser} from "@customTypes/UserTypes"

interface UserState {
    isAuthenticated: boolean;
    user: IUser;
    accessToken: string | null;
    refreshToken: string | null;
    isPending: boolean;
    error: string | null;
  }

const initialState: UserState = {
    isAuthenticated:false,
    user: {
        _id: null,
        username: null,
        displayName: null,
        email: null,
        isVerified: null,
        bio: null,
        location:null,
        avatar: null,
        avatarId:null,
        cover:null,
        coverId:null,
        following:[],
        createdAt: null,
        updatedAt: null
    },
    accessToken: null,
    refreshToken: null,
    isPending: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        // Create user
        [userApi.createUser.pending.type]: (state, action) => {
            state.isPending = true;
        },
        [userApi.createUser.fulfilled.type]: (state, action) => {
            state.isPending = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.tokens.accessToken;
            state.refreshToken = action.payload.tokens.refreshToken;
        },
        [userApi.createUser.rejected.type]: (state, action) => {
            state.isPending = false;
            state.error = action.payload;
        },
        // Login user
        [userApi.loginUser.pending.type]: (state, action) => {
            state.isPending = true;
        },
        [userApi.loginUser.fulfilled.type]: (state, action) => {
            state.isPending = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        [userApi.loginUser.rejected.type]: (state, action) => {
            state.isPending = false;
            state.error = action.payload;
        },
        // Logout user
        [userApi.logoutUser.pending.type]: (state, action) => {
            state.isPending = true;
        },
        [userApi.logoutUser.fulfilled.type]: (state, action) => {
            state.isPending = false;
            state.error = null;
            state.isAuthenticated = false;
            state.user = initialState.user;
            state.accessToken = null;
            state.refreshToken = null;
        },
        [userApi.logoutUser.rejected.type]: (state, action) => {
            state.isPending = false;
            state.error = action.payload;
        }
    }
});

export default userSlice.reducer;