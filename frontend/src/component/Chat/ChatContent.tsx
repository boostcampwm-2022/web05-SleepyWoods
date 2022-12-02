import { chat, chatTime, chatUser } from './chat.styled';

const ChatContent = ({ data }: { data: any }) => {
  const { timestamp, nickname, message } = data;

  return (
    <li css={chat}>
      <div css={chatUser}>
        <span css={chatTime}>[{timestamp}]</span>
        <span>{nickname}</span>
      </div>
      <span>{message}</span>
    </li>
  );
};
export default ChatContent;
