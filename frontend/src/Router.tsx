import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Signin from './page/Signin';
import Signup from './page/Signup';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Router;
