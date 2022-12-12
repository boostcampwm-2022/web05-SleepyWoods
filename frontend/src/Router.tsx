import { Route, Routes } from 'react-router-dom';
import Town from './page/Town';
import Main from './page/Main';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { routerGuard } from './guard';

const Router = () => {
  routerGuard();

  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/town" element={<Town />} />
    </Routes>
  );
};

export default Router;
