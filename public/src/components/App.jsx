import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HomeRoot from './home/HomeRoot';
import ProfileRoot from './profile/ProfileRoot';
import LoginRoot from './login/LoginRoot';
import FakeData from './FakeData'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={HomeRoot()} />
          <Route path="/login" element={LoginRoot()} />
          <Route path="/profile" element={ProfileRoot()} />
          <Route path="/fakedata" element={FakeData()} />
        </Routes>
      </Router>
    </div>
  );
}
