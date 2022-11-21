import { useState } from 'react';
import {
  header,
  character,
  nicknameContainer,
  nickname,
  CarouselContainer,
  characterWrapper,
} from './setting.styled';
import { ArrowButton, SignupButton } from '../Button';
import { hairName } from './hair';

type CarouselType = {
  hairIdx: number;
  setHairIdx: React.Dispatch<React.SetStateAction<number>>;
};

const Carousel = ({ hairIdx, setHairIdx }: CarouselType) => {
  const hairCnt = Object.keys(hairName).length - 1;

  const minusIdx = () => {
    if (hairIdx - 1 < -1) setHairIdx(hairCnt - 1);
    else setHairIdx(hairIdx - 1);
  };

  const plusIdx = () => {
    if (hairIdx + 1 >= hairCnt) setHairIdx(-1);
    else setHairIdx(hairIdx + 1);
  };

  return (
    <div css={CarouselContainer}>
      <ArrowButton type="prev" event={minusIdx} />
      <div css={characterWrapper}>
        <div css={character(hairName[hairIdx])}></div>
      </div>
      <ArrowButton type="next" event={plusIdx} />
    </div>
  );
};

const Setting = () => {
  const [hairIdx, setHairIdx] = useState(-1);

  const signup = () => {
    console.log('signup');
    console.log(hairIdx);
  };

  return (
    <>
      <h2 css={header}>Setting</h2>
      <Carousel hairIdx={hairIdx} setHairIdx={setHairIdx} />
      <div css={nicknameContainer}>
        <input
          type="text"
          css={nickname}
          placeholder="설정할 닉네임을 입력하세요."
        />
        <SignupButton event={signup}>Signup</SignupButton>
      </div>
    </>
  );
};

export default Setting;
