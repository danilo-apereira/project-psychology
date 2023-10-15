import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';

import Signin from './Pages/AuthPage/Signin';
import Signup from './Pages/AuthPage/Signup';

import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/auth/signin" element={<Signin />} />
        <Route exact path="/auth/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
