import { useEffect, useRef } from 'react';
import * as style from './chat.styled';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';

const ChatMessage = ({
  updateChat,
  isExtend,
  chatDatas,
  setChatDatas,
}: {
  updateChat: Function;
  isExtend: boolean;
  chatDatas: any;
  setChatDatas: Function;
}) => {
  const socket = useRecoilValue(socketState);
  const chatRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    // 채팅창 초기화
    const sessionStorageChat = sessionStorage.getItem('chat');
    if (sessionStorageChat) {
      setChatDatas(JSON.parse(sessionStorageChat));
    }

    // 다른 사람의 채팅받기
    socket.on('publicChat', (chat: any) => {
      updateChat(chat);
    });

    return () => {
      socket.removeListener('publicChat');
    };
  }, []);

  // 채팅 하단으로 이동
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatDatas]);

  return (
    <ul css={style.chatText(isExtend)} ref={chatRef}>
      {chatDatas.map((data: any, idx: any) => {
        const { timestamp, nickname, message } = data;
        return (
          <li css={style.chat} key={idx}>
            <div css={style.chatUser}>
              <span css={style.chatTime}>[{timestamp}]</span>
              <span>{nickname}</span>
            </div>
            <span>{message}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatMessage;
