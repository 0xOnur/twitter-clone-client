import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import {HomeLayout, TweetDetailsLayout} from "./layout"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<HomeLayout />} />
        <Route path="explore" element={<HomeLayout />} />
        <Route path="notifications" element={<HomeLayout />} />
        <Route path="messages" element={<HomeLayout />} />
        <Route path="bookmarks" element={<HomeLayout />} />
        <Route path="lists" element={<HomeLayout />} />
        <Route path="profile" element={<HomeLayout />} />
        <Route path="/:username/status/:tweet_id" element={<TweetDetailsLayout />} />
      </Routes>
    </div>
  );
}

export default App;
