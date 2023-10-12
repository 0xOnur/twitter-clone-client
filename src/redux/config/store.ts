import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import userReducer from "../slices/userSlice";
import chatReducer from "../slices/chatSlice";
import composerReducer from "../slices/composerSlice";

const persistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user", "accessToken", "refreshToken", "isAuthenticated"],
  blacklist: ["error", "isPending"],
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  chatComposer: chatReducer,
  composer: composerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
