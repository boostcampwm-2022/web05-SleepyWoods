import { Route, Routes } from 'react-router-dom';
import Town from './page/Town';
import Main from './page/Main';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from './store/atom/user';

const Router = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, status } = await axios.get('/api/user/auth');

      if (status === 200) {
        setUser({
          nickname: data.nickname.trim(),
          hair: data.characterName.trim(),
        });
      }
    };

    checkAuth();
  }, []);

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
