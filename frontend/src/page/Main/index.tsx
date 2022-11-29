import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { socketState } from '../../store/atom/socket';
import { userState } from '../../store/atom/user';
import { io, Socket } from 'socket.io-client';

const getCookieValue = (key: string) => {
  let cookieKey = key + '=';
  let result = '';
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === ' ') {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

const Main = () => {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get('/api/user/auth');

      if (response.status === 200) {
        setHasToken(true);

        setUser({
          nickname: response.data.nickname,
          hair: response.data.characterName,
        });

        const socket = io('localhost:3333', {
          extraHeaders: {
            authorization: getCookieValue(document.cookie),
            room: '',
          },
        });

        socket.on('userCreated', (data: any) => {
          console.log(data);
        });

        socket.on('connect', () => {
          console.log('test connected');
        });
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
