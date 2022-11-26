import Content from '../Content';
import { chatInfo, chatItemWrapper, message } from './chat.styled';

const ChatItem = ({ data }: { data: any }) => {
  const { user, timestamp, lastMessage, isCheckedLastMessage } = data;

  return (
    <Content>
      <div css={chatItemWrapper}>
        <div css={chatInfo(isCheckedLastMessage)}>
          <span className="user">{user}</span>
          <span className="timestamp">{timestamp}</span>
        </div>
        <div css={message}>{lastMessage}</div>
      </div>
    </Content>
  );
};

export default ChatItem;
