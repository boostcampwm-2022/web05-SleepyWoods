import { useState } from 'react';
import {
  header,
  character,
  nicknameContainer,
  nickname,
  signupBtn,
  prevBtn,
  nextBtn,
  CarowselContainer,
  characterWrapper,
} from './setting.styled';
import hair from './hair';

const Carowsel = () => {
  const [hairIdx, setHairIdx] = useState(0);

  const minusIdx = () => {
    if (hairIdx - 1 < 0) setHairIdx(hair.length);
    else setHairIdx(hairIdx - 1);
  };

  const plusIdx = () => {
    if (hairIdx + 1 > hair.length) setHairIdx(0);
    else setHairIdx(hairIdx + 1);
  };

  return (
    <div css={CarowselContainer}>
      <button type="button" css={prevBtn} onClick={minusIdx}></button>
      <div css={characterWrapper}>
        <div css={character(hair[hairIdx])}></div>
      </div>
      <button type="button" css={nextBtn} onClick={plusIdx}></button>
    </div>
  );
};

const Setting = () => (
  <>
    <h2 css={header}>Setting</h2>
    <Carowsel />
    <div css={nicknameContainer}>
      <input
        type="text"
        css={nickname}
        placeholder="설정할 닉네임을 입력하세요."
      />
      <button css={signupBtn}>Signup</button>
    </div>
  </>
);

export default Setting;
