import { Route, Routes } from 'react-router-dom';
import Town from './page/Town';
import Main from './page/Main';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from './store/atom/user';
import { friendsState } from './store/atom/friends';

type friendList = {
  nickname: string;
  characterName: string;
};

const Router = () => {
  const setUser = useSetRecoilState(userState);
  const setFriends = useSetRecoilState(friendsState);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, status } = await axios.get('/api/user/auth');

      if (status === 200) {
        setUser({
          id: data.id.toString().trim(),
          nickname: data.nickname.trim(),
          hair: data.characterName.trim(),
        });

        (async () => {
          const response = await axios.get('/api/friendship');

          const friendList: friendList[] = response.data;
          if (!friendList.length) return;

          const initialList: any = {};
          friendList.forEach(({ nickname }) => {
            initialList[nickname] = {
              isOnline: false,
              name: nickname,
              isCalling: false,
            };
          });

          setFriends(initialList);
        })();
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
