import axios, { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import { UserChangeButton } from '../../Button';
import { emitter } from '../../Game/util';
import { nicknameContainer } from '../../Setting/setting.styled';
import Content from '../Content';
import * as style from './mypage.styled';
import { socketState } from '../../../store/atom/socket';

const NickNameContent = () => {
  const socket = useRecoilValue(socketState);
  const [nickName, setNickName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const user = useRecoilValue(userState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const changeNickName = async () => {
    try {
      const { status } = await axios({
        method: 'POST',
        url: '/api/user',
        data: {
          signupData: {
            nickname: nickName,
            characterName: user.hair,
          },
        },
        withCredentials: true,
      });

      if (status === 200) {
        emitter.emit('updateNickname', nickName);
        socket.emit('userDataChanged', {
          nickname: nickName,
          characterName: user.hair,
        });
        user.nickname = nickName;

        alert(`닉네임이 ${nickName}으로 변경되었습니다`);
        setNickName('');
        setErrorMessage('');
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

  return (
    <Content>
      <h2 css={style.header}>닉네임 변경</h2>
      <div css={nicknameContainer}>
        <input
          type="text"
          css={style.input}
          value={nickName}
          onChange={handleChange}
          placeholder="변경할 닉네임을 입력하세요."
        />
        <div css={style.errorMessage}>{errorMessage}</div>
        <UserChangeButton event={changeNickName}>
          닉네임 변경하기
        </UserChangeButton>
      </div>
    </Content>
  );
};

export default NickNameContent;
