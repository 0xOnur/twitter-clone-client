import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component

import { HomeLayout, TweetDetailsLayout, UserProfileLayout } from './layout';
import { LoginBar, AuthModal } from '@components/index';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="login" element={<AuthModal isOpen={false} mode="login" isRoute={true} />} />
        <Route path="signup" element={<AuthModal isOpen={false} mode="signup" isRoute={true} />} />
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
   
        <Route path="/:username/status/:tweet_id" element={<TweetDetailsLayout />} />
      </Routes>
      {!isAuthenticated && <LoginBar />}
    </div>
  );
}

export default App;
