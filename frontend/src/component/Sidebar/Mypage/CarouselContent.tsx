import { useState } from 'react';
import { UserChangeButton } from '../../Button';
import Content from '../Content';
import { Carousel } from '../../Carousel/Calrousel';
import * as style from './mypage.styled';
import { hairName, hairIdx } from '../../Carousel/hair';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import axios from 'axios';
import { emitter } from '../../Game/util';

const CarouselContent = () => {
  const user = useRecoilValue(userState);
  const [selectHairIdx, setSelectHairIdx] = useState(hairIdx[user.hair]);

  const changeCharacter = async () => {
    try {
      const { status } = await axios({
        method: 'POST',
        url: '/api/user',
        data: {
          signupData: {
            nickname: user.nickname,
            characterName: hairName[selectHairIdx],
          },
        },
        withCredentials: true,
      });

      if (status === 200) {
        emitter.emit('updateHair', hairName[selectHairIdx]);
      }
    } catch (e) {
      alert('다시 시도해주세요');
    }
  };

  return (
    <Content>
      <h2 css={style.header}>캐릭터 선택</h2>
      <Carousel hairIdx={selectHairIdx} setHairIdx={setSelectHairIdx} />
      <UserChangeButton event={changeCharacter}>
        캐릭터 변경하기
      </UserChangeButton>
    </Content>
  );
};
export default CarouselContent;
