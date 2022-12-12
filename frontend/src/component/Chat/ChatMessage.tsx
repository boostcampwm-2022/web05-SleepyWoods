import { useEffect, useRef } from 'react';
import * as style from './chat.styled';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import ChatContent from './ChatContent';
import { chatType, userType } from '../../types/types';

const ChatMessage = ({
  updateChat,
  isExtend,
  chatDatas,
  setChatDatas,
}: {
  updateChat: Function;
  isExtend: boolean;
  chatDatas: chatType[];
  setChatDatas: Function;
}) => {
  const socket = useRecoilValue(socketState);
  const chatRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // 채팅창 초기화
    const sessionStorageChat = sessionStorage.getItem('chat');
    if (sessionStorageChat) {
      setChatDatas(JSON.parse(sessionStorageChat));
    }

    // 다른 사람의 채팅받기
    socket.on('publicChat', (chat: chatType) => {
      updateChat(chat);
    });

    socket.on('userCreated', (data: userType) => {
      const chat = {
        type: 'info',
        nickname: data.nickname,
        timestamp: Date.now(),
        message: '님이 입장하셨습니다.',
      };
      updateChat(chat);
    });

    socket.on('userLeaved', (data: userType) => {
      const chat = {
        type: 'info',
        nickname: data.nickname,
        timestamp: Date.now(),
        message: '님이 퇴장하셨습니다.',
      };
      updateChat(chat);
    });

    return () => {
      socket.removeListener('publicChat');
      socket.removeListener('userCreated');
      socket.removeListener('userLeaved');
    };
  }, []);

  // 채팅 하단으로 이동
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatDatas]);

  return (
    <div css={style.chatTextWrapper(isExtend)} ref={chatRef}>
      <ul css={style.chatText}>
        {chatDatas.map((data, idx: number) => (
          <ChatContent data={data} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default ChatMessage;
