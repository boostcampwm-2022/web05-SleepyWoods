import { chat, chatTime, chatUser } from './chat.styled';

const ChatContent = ({ data }: { data: any }) => {
  const { time, nickname, text } = data;

  return (
    <li css={chat}>
      <div css={chatUser}>
        <span css={chatTime}>[{time}]</span>
        <span>{nickname}</span>
      </div>
      <span>{text}</span>
    </li>
  );
};
export default ChatContent;
