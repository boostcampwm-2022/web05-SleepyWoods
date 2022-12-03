import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { userState } from '../../store/atom/user';
import * as style from './chat.styled';

const Input = ({ updateChat }: { updateChat: Function }) => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const [chatValue, setChatValue] = useState('');

  // 채팅 input 값 관리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  // Enter 키 클릭 시
  const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !chatValue) return;

    const chat = {
      type: 'chat',
      timestamp: Date.now(),
      nickname: user.nickname,
      message: chatValue,
    };

    socket.emit('publicChat', { message: chatValue });

    updateChat(chat);
    setChatValue('');
  };

  return (
    <input
      type="text"
      css={style.chatInput}
      value={chatValue}
      onChange={handleChange}
      onKeyUp={checkEnter}
    />
  );
};
export default Input;
