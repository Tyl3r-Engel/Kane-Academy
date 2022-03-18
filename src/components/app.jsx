import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import homeRoot from './home/homeRoot';
import profileRoot from './profile/profileRoot';
import loginRoot from './login/loginRoot';

export default function App() {
  console.log(window.location.pathname);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={homeRoot()} />
          <Route path="/login" element={loginRoot()} />
          <Route path="/profile" element={profileRoot()} />
        </Routes>
      </Router>
    </div>
  );
}
