import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as userApi from "../../api/userApi";

type errorPayload = {
  message: string;
};

export interface UserState {
  isAuthenticated: boolean;
  user: IUser | null;
  notifications: INotification[] | null;
  messageNotifications: IMessage[] | null;
  accessToken: string | null;
  refreshToken: string | null;
  isPending: boolean;
  error: {
    message: string | null;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  notifications: null,
  messageNotifications: null,
  accessToken: null,
  refreshToken: null,
  isPending: false,
  error: {
    message: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotification>) => {
      if (state.notifications) {
        state.notifications.push(action.payload);
      } else {
        state.notifications = [action.payload];
      }
    },
    clearNotification: (state) => {
      state.notifications = null;
    },
    setMessageNotification: (state, action: PayloadAction<IMessage>) => {
      if (state.messageNotifications) {
        state.messageNotifications.push(action.payload);
      } else {
        state.messageNotifications = [action.payload];
      }
    },
    clearMessageNotification: (state) => {
      state.messageNotifications = null;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.accessToken = null;
      state.refreshToken = null;
      state.isPending = false;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    // Create user
    builder.addCase(userApi.createUser.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(userApi.createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error.message = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
    });
    builder.addCase(userApi.createUser.rejected, (state, action) => {
      state.isPending = false;
      state.error.message =
        (action.payload as errorPayload)?.message || "Error creating user";
    });
    // Login user
    builder.addCase(userApi.loginUser.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(userApi.loginUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error.message = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
    });
    builder.addCase(userApi.loginUser.rejected, (state, action) => {
      state.isPending = false;
      state.error.message =
        (action.payload as errorPayload)?.message || "Error login user";
    });
    // Get new accessToken
    builder.addCase(userApi.updateAccessToken.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(userApi.updateAccessToken.fulfilled, (state, action) => {
      state.isPending = false;
      state.error.message = null;
      state.accessToken = action.payload;
    });
    builder.addCase(userApi.updateAccessToken.rejected, (state, action) => {
      state.isPending = false;
      state.error.message =
        (action.payload as errorPayload)?.message ||
        "Error getting new access token";
    });
    // Update User
    builder.addCase(userApi.updateRedux.fulfilled, (state, action) => {
      state.isPending = false;
      state.error.message = null;
      state.user = action.payload;
    });
    builder.addCase(userApi.updateRedux.rejected, (state, action) => {
      state.isPending = false;
      state.error.message =
        (action.payload as errorPayload)?.message || "Error updating user";
    });
  },
});

export const {
  logoutUser,
  setNotification,
  clearNotification,
  setMessageNotification,
  clearMessageNotification,
} = userSlice.actions;

export default userSlice.reducer;
