import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { friendsState } from '../../store/atom/friends';
import { socketState } from '../../store/atom/socket';
import { userState } from '../../store/atom/user';

export const getCookieValue = (key: string) => {
  const cookieArr = document.cookie.split(';');
  let result = '';

  cookieArr.forEach((cookie: string) => {
    const [k, v] = cookie.split('=');
    if (k === key) result = v;
  });

  return result;
};

type friendList = {
  nickname: string;
  characterName: string;
};

const Main = () => {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [socket, setSocket] = useRecoilState(socketState);
  const [friends, setFriends] = useRecoilState(friendsState);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get('/api/user/auth');

      if (response.status === 200) {
        setHasToken(true);

        setUser({
          nickname: response.data.nickname,
          hair: response.data.characterName,
        });

        socket.connect();

        socket.on('connect', () => {
          console.log('connect');
        });

        socket.on('userCreated', (data: any) => {
          console.log(data);
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
      } else setHasToken(false);
    };

    checkAuth();
  }, []);

  return (
    <Background>
      <MainContent hasToken={hasToken} />
    </Background>
  );
};

export default Main;
