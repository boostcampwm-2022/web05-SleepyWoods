import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
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
