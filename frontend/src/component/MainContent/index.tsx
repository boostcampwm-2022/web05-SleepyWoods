import { Link } from 'react-router-dom';
import { MainButton } from '../Button';
import { buttons, container, logo } from './mainContent.styled';

const ClientButton = () => {
  return (
    <>
      <Link to={'/map'}>
        <MainButton type={'light'}>입장하기</MainButton>
      </Link>
      <Link to={'/'}>
        <MainButton type={'dark'}>로그아웃</MainButton>
      </Link>
    </>
  );
};

const GuestButton = () => {
  return (
    <Link to={'/signin'}>
      <MainButton type={'light'}>로그인하기</MainButton>
    </Link>
  );
};

const MainContent = ({ hasToken }: { hasToken: boolean }) => {
  return (
    <section css={container}>
      <h1 css={logo}>Sleepy Woods</h1>
      <div css={buttons}>{hasToken ? <ClientButton /> : <GuestButton />}</div>
    </section>
  );
};

export default MainContent;
