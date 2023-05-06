import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // for authenticated users routes.
import PublicRoute from "./PublicRoute"; // for ignore the authenticated users to login/register page
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { HomeLayout, TweetDetailsLayout, UserProfileLayout } from "./layout";
import { LoginBar, AuthModal } from "@components/index";
import Logout from "@components/auth/Logout";

function App() {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [isAuthenticated, setAuthenticated] = useState(
    reduxUser.isAuthenticated
  );

  useEffect(() => {
    setAuthenticated(reduxUser.isAuthenticated);
  }, [reduxUser]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route
        path="login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <AuthModal isOpen={false} mode="login" isRoute={true} />
          </PublicRoute>
        }
      />
      <Route
        path="signup"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <AuthModal isOpen={false} mode="signup" isRoute={true} />
          </PublicRoute>
        }
      />
        <Route
          path="logout"
          element={
              <Logout />
          }
        />
        <Route path="home" element={<HomeLayout />} />
        <Route path="explore" element={<HomeLayout />} />
        <Route
          path="notifications"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomeLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="messages"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomeLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="bookmarks"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomeLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="lists"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomeLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/:username"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserProfileLayout />
            </PrivateRoute>
          }
        />

        <Route
          path="/:username/status/:tweet_id"
          element={<TweetDetailsLayout />}
        />
      </Routes>
      {!isAuthenticated && <LoginBar />}
    </div>
  );
}

export default App;
