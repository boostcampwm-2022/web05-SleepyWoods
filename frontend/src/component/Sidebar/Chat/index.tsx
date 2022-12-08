import { chatContainer } from './chat.styled';
import ChatList from './ChatList';
import Chatting from './Chatting';
import { useRecoilState } from 'recoil';
import { chattingState } from '../../../store/atom/chatting';

const Chat = () => {
  const [chatTarget, setChatTarget] = useRecoilState(chattingState);

  return (
    <ul css={chatContainer}>
      {chatTarget.id ? (
        <Chatting chatTarget={chatTarget} setChatTarget={setChatTarget} />
      ) : (
        <ChatList setChatTarget={setChatTarget} />
      )}
    </ul>
  );
};

export default Chat;
