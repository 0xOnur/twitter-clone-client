import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import {HomeLayout, TweetDetailsLayout, UserProfileLayout} from "./layout"
import {Login} from '@components/index';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="login" element={<Login.AuthModal isOpen={false} mode='login' isRoute={true} />} />
        <Route path="signup" element={<Login.AuthModal isOpen={false} mode='signup' isRoute={true} />} />
        <Route path="home" element={<HomeLayout />} />
        <Route path="explore" element={<HomeLayout />} />
        <Route path="notifications" element={<HomeLayout />} />
        <Route path="messages" element={<HomeLayout />} />
        <Route path="bookmarks" element={<HomeLayout />} />
        <Route path="lists" element={<HomeLayout />} />
        <Route path="/:username" element={<UserProfileLayout />} />
        <Route path="/:username/status/:tweet_id" element={<TweetDetailsLayout />} />
      </Routes>
      {!isAuthenticated && <Login.LoginBar />}
    </div>
  );
}

export default App;
