import { ChangeEvent, useState } from 'react';
import { header, nicknameContainer, nickname } from './setting.styled';
import { SignupButton } from '../Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../Carousel/Calrousel';
import { hairName } from '../Carousel/hair';

const Setting = () => {
  const navigate = useNavigate();
  const [hairIdx, setHairIdx] = useState(-1);
  const [nickName, setNickName] = useState('');

  const signup = async () => {
    const data = await axios({
      method: 'POST',
      url: '/api/user',
      data: {
        signupData: {
          nickname,
          characterName: hairName[hairIdx],
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <>
      <h2 css={header}>Setting</h2>
      <Carousel hairIdx={hairIdx} setHairIdx={setHairIdx} />
      <div css={nicknameContainer}>
        <input
          type="text"
          css={nickname}
          value={nickName}
          onChange={handleChange}
          placeholder="설정할 닉네임을 입력하세요."
        />
        <SignupButton event={signup}>Signup</SignupButton>
      </div>
    </>
  );
};

export default Setting;
