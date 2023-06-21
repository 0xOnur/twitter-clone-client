import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute'; //for ignore the authenticated users to login/signup page
import PrivateRoute from './PrivateRoute'; // for authenticated users routes.
import { Navigate } from 'react-router-dom';
import { AuthModal } from '@components/auth';
import Logout from '@components/auth/Logout';
import { HomeLayout, TweetDetailsLayout, UserProfileLayout, FollowsLayout } from "@layout/index";
import ConnectPeopleLayout from '@layout/ConnectPeopleLayout';

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
          element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
        />
        
        <Route
          path="/:username/:tab"
          element={<UserProfileLayout isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/:username/status/:tweetId"
          element={<TweetDetailsLayout />}
        />

        <Route
          path='/:username/followers'
          element={<FollowsLayout isAuthenticated={isAuthenticated} followsTab='followers' />}
        />
        <Route
          path='/:username/following'
          element={<FollowsLayout isAuthenticated={isAuthenticated} followsTab='following' />}
        />

        <Route
          path='/i/connect_people'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ConnectPeopleLayout isAuthenticated={isAuthenticated} />
            </PrivateRoute>
          }
        />
      </Routes>
  )
}

export default AppRoutes