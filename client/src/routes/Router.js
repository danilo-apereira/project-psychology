import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/HomePage/HomePage';

import Signin from '../Pages/SigninPage/Signin';
import Signup from '../Pages/SignupPage/Signup';

import NotFound from '../Pages/NotFound/NotFound';

const Router = () => (
    <Routes>
      <Route exact path="/" element={<HomePage />} />

      <Route exact path="/auth/signin" element={<Signin />} />
      <Route exact path="/auth/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
)

export default Router;
