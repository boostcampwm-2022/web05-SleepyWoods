import axios from 'axios';
import Content from '../Content';
import * as style from './mypage.styled';

const LogoutButton = () => {
  const logout = async () => {
    const res = confirm('로그아웃 하시겠습니까?');
    if (res) {
      const data = await axios.get('/api/user/logout');
      if (data.status === 200) location.href = '/';
    }
  };

  return (
    <Content>
      <h2 css={style.header}>로그아웃</h2>
      <button type="button" css={style.logoutBtn} onClick={logout}>
        로그아웃
      </button>
    </Content>
  );
};

export default LogoutButton;
