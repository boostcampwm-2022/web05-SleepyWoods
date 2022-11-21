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
import hair from './hair';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type CarouselType = {
  hairIdx: number;
  setHairIdx: React.Dispatch<React.SetStateAction<number>>;
};

const Carousel = ({ hairIdx, setHairIdx }: CarouselType) => {
  const minusIdx = () => {
    if (hairIdx - 1 < 0) setHairIdx(hair.length);
    else setHairIdx(hairIdx - 1);
  };

  const plusIdx = () => {
    if (hairIdx + 1 > hair.length) setHairIdx(0);
    else setHairIdx(hairIdx + 1);
  };

  return (
    <div css={CarouselContainer}>
      <ArrowButton type="prev" event={minusIdx} />
      <div css={characterWrapper}>
        <div css={character(hair[hairIdx])}></div>
      </div>
      <ArrowButton type="next" event={plusIdx} />
    </div>
  );
};

const Setting = () => {
  const navigate = useNavigate();

  const [hairIdx, setHairIdx] = useState(0);

  const signup = async () => {
    const data = await axios({
      method: 'POST',
      url: '/api/user',
      data: {
        signupData: {
          nickname: 'ktmihsKakao',
          characterName: 'longhair',
        },
      },
      withCredentials: true,
    });

    if (data.status === 200) {
      navigate('/');
    } else if (data.status === 400) {
      console.log('validation error(4~12, 한글 영어 숫자만 가능)');
    } else if (data.status === 406) {
      console.log('닉네임 중복!');
    } else {
      console.log('모르겠어용');
    }
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
