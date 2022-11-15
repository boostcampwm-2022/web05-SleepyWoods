import { Link } from 'react-router-dom';
import { SignButton } from '../Button';
import { buttons, container, logo } from './mainContent.styled';

const ClientButton = () => {
  return (
    <>
      <Link to={'/map'}>
        <SignButton type={'light'}>입장하기</SignButton>
      </Link>
      <Link to={'/'}>
        <SignButton type={'dark'}>로그아웃</SignButton>
      </Link>
    </>
  );
};

const GuestButton = () => {
  return (
    <Link to={'/signin'}>
      <SignButton type={'light'}>로그인하기</SignButton>
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
