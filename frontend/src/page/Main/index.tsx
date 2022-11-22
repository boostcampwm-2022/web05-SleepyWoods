import axios from 'axios';
import { useEffect, useState } from 'react';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';

const Main = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const data = await axios.get('/api/user/auth');
      data.status === 200 ? setHasToken(true) : setHasToken(false);
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
