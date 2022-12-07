import { ChangeEvent, useState } from 'react';
import * as style from './setting.styled';
import { SignupButton } from '../Button';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../Carousel/Calrousel';
import { hairName } from '../Carousel/hair';

const Setting = () => {
  const navigate = useNavigate();
  const [hairIdx, setHairIdx] = useState(-1);
  const [nickName, setNickName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signup = async () => {
    try {
      const { status } = await axios({
        method: 'POST',
        url: '/api/user',
        data: {
          signupData: {
            nickname: nickName,
            characterName: hairName[hairIdx],
          },
        },
        withCredentials: true,
      });

      if (status === 200) {
        location.href = "/";
      }
    } catch (error) {
      const e = error as AxiosError;
      if (!e.response) return;

      if (e.response.status === 400) {
        setErrorMessage(
          '닉네임은 2 ~ 16글자이어야 하고, 한글, 영어 및 숫자만 가능합니다'
        );
      } else if (e.response.status === 401) {
        setErrorMessage('토큰이 유효하지 않습니다');
      } else if (e.response.status === 406) {
        setErrorMessage('중복된 닉네임입니다');
      } else {
        setErrorMessage('다시 시도해주세요');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <>
      <h2 css={style.header}>Setting</h2>
      <Carousel hairIdx={hairIdx} setHairIdx={setHairIdx} />
      <div css={style.nicknameContainer}>
        <input
          type="text"
          css={style.nickname}
          value={nickName}
          onChange={handleChange}
          placeholder="설정할 닉네임을 입력하세요."
        />
        {errorMessage && <span css={style.errorMessage}>{errorMessage}</span>}
        <SignupButton event={signup}>Signup</SignupButton>
      </div>
    </>
  );
};

export default Setting;
