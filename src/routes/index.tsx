import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute"; //for ignore the authenticated users to login/signup page
import PrivateRoute from "./PrivateRoute"; // for authenticated users routes.
import { Navigate } from "react-router-dom";
import { AuthModal } from "@components/auth";
import Logout from "@components/auth/Logout";
import {
  HomeLayout,
  FollowsLayout,
  BookmarksLayout,
  TweetQuotesLayout,
  UserProfileLayout,
  TweetDetailsLayout,
  NotificationsLayout,
  ConnectPeopleLayout,
  MessagesLayout,
} from "@layout/index";
import React from "react";
import Title from "./Title";

interface IAppRoutes {
  isAuthenticated: boolean;
}

const withTitle = (component: React.ReactNode, title: string) => {
  return (
    <>
      <Title title={title} />
      {component}
    </>
  );
};

const AppRoutes = ({ isAuthenticated }: IAppRoutes) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />

      <Route
        path="home"
        element={withTitle(
          <HomeLayout isAuthenticated={isAuthenticated} />,
          "Home / Twitter"
        )}
      />

      <Route
        path="login"
        element={withTitle(
          <PublicRoute isAuthenticated={isAuthenticated}>
            <AuthModal isOpen={false} mode="login" isRoute={true} />
          </PublicRoute>,
          "Log in / Twitter"
        )}
      />
      <Route
        path="signup"
        element={withTitle(
          <PublicRoute isAuthenticated={isAuthenticated}>
            <AuthModal isOpen={false} mode="signup" isRoute={true} />
          </PublicRoute>,
          "Sign up / Twitter"
        )}
      />
      <Route path="logout" element={withTitle(<Logout />, "Log out ")} />

      <Route
        path="explore"
        element={withTitle(
          <HomeLayout isAuthenticated={isAuthenticated} />,
          "Explore / Twitter"
        )}
      />
      <Route
        path="notifications"
        element={withTitle(
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <NotificationsLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>,
          "Notifications / Twitter"
        )}
      />

      <Route
        path="messages"
        element={withTitle(
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <MessagesLayout />
          </PrivateRoute>,
          "Messages / Twitter"
        )}
      >
        <Route path=":conversationId" />
        <Route path=":conversationId/info" />
      </Route>

      <Route
        path="i/bookmarks"
        element={withTitle(
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <BookmarksLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>,
          "Bookmarks / Twitter"
        )}
      />

      <Route
        path=":username"
        element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path=":username/:tab"
        element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path=":username/status/:tweetId"
        element={<TweetDetailsLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path=":username/status/:tweetId/retweets/with_comments"
        element={<TweetQuotesLayout isAuthenticated={isAuthenticated} />}
      />

      <Route
        path=":username/followers"
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
        path="i/connect_people"
        element={withTitle(
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <ConnectPeopleLayout isAuthenticated={isAuthenticated} />
          </PrivateRoute>,
          "Connect / Twitter"
        )}
      />
    </Routes>
  );
};

export default AppRoutes;
