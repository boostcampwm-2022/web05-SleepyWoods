import { ChangeEvent, useState } from 'react';
import { UserChangeButton } from '../../Button';
import { nicknameContainer } from '../../Setting/setting.styled';
import Content from '../Content';
import * as style from './mypage.styled';

const NickNameContent = () => {
  const [nickName, setNickName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const changeNickName = () => {
    console.log(nickName);
  };

  return (
    <Content>
      <h2 css={style.header}>닉네임 변경</h2>
      <div css={nicknameContainer}>
        <input
          type="text"
          css={style.nickname}
          value={nickName}
          onChange={handleChange}
          placeholder="변경할 닉네임을 입력하세요."
        />
        <UserChangeButton event={changeNickName}>
          닉네임 변경하기
        </UserChangeButton>
      </div>
    </Content>
  );
};

export default NickNameContent;
