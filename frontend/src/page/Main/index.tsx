import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { pageGuard } from '../../guard';

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
  pageGuard();

  return (
    <Background>
      <MainContent />
    </Background>
  );
};

export default Main;
