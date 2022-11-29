import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { socketState } from '../../store/atom/socket';
import { userState } from '../../store/atom/user';

const Main = () => {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    console.log(socket);
    socket.on('connect', () => {
      console.log('test connected');
    });
    const checkAuth = async () => {
      const response = await axios.get('/api/user/auth');

      if (response.status === 200) {
        setHasToken(true);

        setUser({
          nickname: response.data.nickname,
          hair: response.data.characterName,
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
