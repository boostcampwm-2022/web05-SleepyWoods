import { useState } from 'react';
import { UserChangeButton } from '../../Button';
import Content from '../Content';
import { Carousel } from '../../Carousel/Calrousel';
import * as style from './mypage.styled';
import { hairName } from '../../Carousel/hair';

const CarouselContent = () => {
  const [hairIdx, setHairIdx] = useState(-1);

  const changeCharacter = () => {
    console.log(hairName[hairIdx]);
  };

  return (
    <Content>
      <h2 css={style.header}>캐릭터 선택</h2>
      <Carousel hairIdx={hairIdx} setHairIdx={setHairIdx} />
      <UserChangeButton event={changeCharacter}>
        캐릭터 변경하기
      </UserChangeButton>
    </Content>
  );
};
export default CarouselContent;
