import { ChangeEvent, useState } from 'react';
import { NickNameChangeButton } from '../../Button';
import { Carousel } from '../../Carousel/Calrousel';
import { nicknameContainer } from '../../Setting/setting.styled';
import Content from '../Content';
import { header, nickname } from './mypage.styled';

const Mypage = () => {
  const [hairIdx, setHairIdx] = useState(-1);
  const [nickName, setNickName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const changeNickName = () => {};

  return (
    <ul>
      <Content>
        <h2 css={header}>캐릭터 선택</h2>
        <Carousel hairIdx={hairIdx} setHairIdx={setHairIdx} />
      </Content>
      <Content>
        <h2 css={header}>닉네임 변경</h2>
        <div css={nicknameContainer}>
          <input
            type="text"
            css={nickname}
            value={nickName}
            onChange={handleChange}
            placeholder="변경할 닉네임을 입력하세요."
          />
          <NickNameChangeButton event={changeNickName}>
            변경하기
          </NickNameChangeButton>
        </div>
      </Content>
    </ul>
  );
};
export default Mypage;
