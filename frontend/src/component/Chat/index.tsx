import { useState } from 'react';
import { chatType } from '../../types/types';
import * as style from './chat.styled';
import ChatMessage from './ChatMessage';
import Input from './Input';
import { calcTimeFromMs } from './util';

const Chat = () => {
  const [isExtend, setIsExtend] = useState(false);
  const [chatDatas, setChatDatas] = useState<chatType[]>([]);

  // 채팅 업데이트
  const updateChat = (chat: chatType) => {
    chat.timestamp = calcTimeFromMs(chat.timestamp);

    sessionStorage.setItem('chat', JSON.stringify([...chatDatas, chat]));
    setChatDatas(chatDatas => [...chatDatas, chat]);
  };

  // 채팅창 크기 변경
  const handleExtend = () => {
    setIsExtend(!isExtend);
  };

  return (
    <section css={style.chatContainer}>
      <button
        type="button"
        css={style.extendBtn(isExtend)}
        onClick={handleExtend}></button>

      <ChatMessage
        updateChat={updateChat}
        isExtend={isExtend}
        chatDatas={chatDatas}
        setChatDatas={setChatDatas}
      />

      <div css={style.chatInputContainer}>
        <Input updateChat={updateChat} />
      </div>
    </section>
  );
};

export default Chat;
