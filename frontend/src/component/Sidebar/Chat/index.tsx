import { chatContainer } from './chat.styled';
import { useState } from 'react';
import ChatList from './ChatList';
import Chatting from './Chatting';

const Chat = () => {
  const [chatTarget, setChatTarget] = useState('');

  return (
    <ul css={chatContainer}>
      {chatTarget ? (
        <Chatting chatTarget={chatTarget} setChatTarget={setChatTarget} />
      ) : (
        <ChatList setChatTarget={setChatTarget} />
      )}
    </ul>
  );
};

export default Chat;
