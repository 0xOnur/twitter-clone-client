import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute"; //for ignore the authenticated users to login/signup page
import PrivateRoute from "./PrivateRoute"; // for authenticated users routes.
import { Navigate } from "react-router-dom";
import { AuthModal } from "@components/auth";
import Logout from "@components/auth/Logout";
import {
  HomeLayout,
  TweetDetailsLayout,
  UserProfileLayout,
  FollowsLayout,
  BookmarksLayout,
} from "@layout/index";
import ConnectPeopleLayout from "@layout/ConnectPeopleLayout";
import TweetQuotesLayout from "@layout/TweetQuotesLayout";

interface IAppRoutes {
  isAuthenticated: boolean;
}

const AppRoutes = ({ isAuthenticated }: IAppRoutes) => {
  return (
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
      <Route path="logout" element={<Logout />} />
      <Route
        path="home"
        element={<HomeLayout isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="explore"
        element={<HomeLayout isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="notifications"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <HomeLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>
        }
      />
      <Route
        path="messages"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <HomeLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>
        }
      />
      <Route
        path="/i/bookmarks"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <BookmarksLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>
        }
      />
      <Route
        path="lists"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <HomeLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>
        }
      />
      <Route
        path="/:username"
        element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path="/:username/:tab"
        element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path="/:username/status/:tweetId"
        element={<TweetDetailsLayout isAuthenticated={isAuthenticated} />}
      />
      
      <Route
        path="/:username/status/:tweetId/retweets/with_comments"
        element={<TweetQuotesLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path="/:username/followers"
        element={
          <FollowsLayout
            isAuthenticated={isAuthenticated}
            followsTab="followers"
          />
        }
      />
      <Route
        path="/:username/following"
        element={
          <FollowsLayout
            isAuthenticated={isAuthenticated}
            followsTab="following"
          />
        }
      />

      <Route
        path="/i/connect_people"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ConnectPeopleLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
