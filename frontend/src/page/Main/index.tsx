import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { userState } from '../../store/atom/user';

const Main = () => {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get('/api/user/auth');
      response.status === 200 ? setHasToken(true) : setHasToken(false);

      setUser({
        nickname: response.data.nickname,
        hair: response.data.characterName,
      });
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
