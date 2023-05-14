import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute'; // for authenticated users routes.
import PrivateRoute from './PrivateRoute'; // for ignore the authenticated users to login/signup page
import { Navigate } from 'react-router-dom';
import { AuthModal } from '@components/auth';
import Logout from '@components/auth/Logout';
import { HomeLayout, TweetDetailsLayout, UserProfileLayout } from "@layout/index";

interface IAppRoutes {
    isAuthenticated: boolean;
}

const AppRoutes = ({isAuthenticated}:IAppRoutes) => {
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
          element={<UserProfileLayout />}
        />
        
        <Route
          path="/:username/:tab"
          element={<UserProfileLayout />}
        />

        <Route
          path="/:username/status/:tweet_id"
          element={<TweetDetailsLayout />}
        />
      </Routes>
  )
}

export default AppRoutes