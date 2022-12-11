import { chatType } from '../../types/types';
import { chat, chatTime, chatUser, info } from './chat.styled';

const ChatContent = ({ data }: { data: chatType }) => {
  const { type, timestamp, nickname, message } = data;

  return (
    <li css={chat}>
      {type === 'info' ? (
        <div css={info}>{'📢 INFO :' + nickname + message}</div>
      ) : (
        <>
          <div css={chatUser}>
            <span css={chatTime}>[{timestamp}]</span>
            <span>{nickname}</span>
          </div>
          <span>{message}</span>
        </>
      )}
    </li>
  );
};
export default ChatContent;
