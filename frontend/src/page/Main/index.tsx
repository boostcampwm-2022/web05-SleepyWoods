import { useState } from 'react';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';

const Main = () => {
  const [hasToken, setHasToken] = useState(false);

  return (
    <Background>
      <MainContent hasToken={hasToken} />
    </Background>
  );
};

export default Main;
