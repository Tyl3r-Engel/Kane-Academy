import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HomeRoot from './home/HomeRoot';
import ProfileRoot from './profile/ProfileRoot';
import LoginRoot from './login/LoginRoot';
import SignupRoot from './signup/SignupRoot';
import FakeData from './FakeData';
import CompleteSignup from './signup/CompleteSignup';
import MsgRoot from './message/msgRoot';
import Messages from './message/Messages';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './shared/themes';

export default function App() {
  return (
    <div className="App">
      {/* <Messages /> */}
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoot />} />
          <Route path="/login" element={<LoginRoot />} />
          <Route path="/signup" element={<SignupRoot />} />
          <Route path="/signup/complete" element={<CompleteSignup />} />
          <Route path="/profile/*" element={<ProfileRoot />} />
          <Route path="/profile" element={<ProfileRoot />} />
          <Route path="/messages" element={<MsgRoot />} />
          <Route path="/fakedata" element={FakeData()} />
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}
