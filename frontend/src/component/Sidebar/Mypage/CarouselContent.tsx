import { useState } from 'react';
import { UserChangeButton } from '../../Button';
import Content from '../Content';
import { Carousel } from '../../Carousel/Calrousel';
import * as style from './mypage.styled';
import { hairName, hairIdx } from '../../Carousel/hair';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';

const CarouselContent = () => {
  const user = useRecoilValue(userState);
  const [selectHairIdx, setSelectHairIdx] = useState(hairIdx[user.hair]);

  const changeCharacter = () => {
    console.log(hairName[selectHairIdx]);
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
