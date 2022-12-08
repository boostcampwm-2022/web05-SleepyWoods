import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atom/user';
import { MainButton } from '../Button';
import { buttons } from '../Button/button.styled';
import logo from '../../assets/logo.png';
import * as style from './mainContent.styled';

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

const MainContent = () => {
  const user = useRecoilValue(userState);

  return (
    <section css={style.container}>
      <img src={logo} css={style.logo} alt="슬리피우드 로고 이미지"></img>
      <div css={buttons}>
        {user.nickname ? <ClientButton /> : <GuestButton />}
      </div>
    </section>
  );
};

export default MainContent;
