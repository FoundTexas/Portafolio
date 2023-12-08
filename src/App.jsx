import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Timeline from './TimelineComponent/Timeline.jsx';
import Game from './Player/Game.jsx';

const NotFound = () => {

  return (
    <p>This is a simple landing page using react-spring animations.</p>
  );
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="" element={<Game />}>
        <Route index element={<Timeline />} />
        <Route path="blogs" element={<Timeline />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="blogs2" element={<Timeline />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
