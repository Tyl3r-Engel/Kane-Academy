import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HomeRoot from './home/HomeRoot';
import ProfileRoot from './profile/ProfileRoot';
import LoginRoot from './login/LoginRoot';

export default function App() {
  console.log(window.location.pathname);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={HomeRoot()} />
          <Route path="/login" element={LoginRoot()} />
          <Route path="/profile" element={ProfileRoot()} />
        </Routes>
      </Router>
    </div>
  );
}
