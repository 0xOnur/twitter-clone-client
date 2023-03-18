import React from 'react';
import {Routes, Route} from 'react-router-dom';

import HomeLayout from './layout/HomeLayout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="home" element={<HomeLayout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
