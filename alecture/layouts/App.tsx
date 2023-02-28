import React from 'react';
import loadable from '@loadable/component'
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));

axios.defaults.baseURL = 'https://jaehyeon.art/sleact';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/channel" element={<Channel />} />
    </Routes>
  );
};

export default App;
