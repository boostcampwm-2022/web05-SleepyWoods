import axios from 'axios';
import { Link } from 'react-router-dom';
import { MainButton } from '../Button';
import { buttons } from '../Button/button.styled';
import { container, logo } from './mainContent.styled';

const ClientButton = () => {
  const handleLogoutEvent = async () => {
    const data = await axios.get('/api/user/logout');
    if (data.status === 200) {
      alert('로그아웃이 성공적으로 이루어졌습니다.');
      location.reload();
    }
  };

  return (
    <>
      <Link to={'/town'}>
        <MainButton type={'light'}>입장하기</MainButton>
      </Link>
      <MainButton type={'dark'} handleClick={handleLogoutEvent}>
        로그아웃
      </MainButton>
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
