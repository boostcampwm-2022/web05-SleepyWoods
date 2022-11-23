import Content from '../Content';
import { chatInfo, chatItemWrapper, message } from './chat.styled';

const ChatItem = ({ data }: { data: any }) => {
  return (
    <Content>
      <div css={chatItemWrapper}>
        <div css={chatInfo(data.isCheckedLastMessage)}>
          <span className="user">{data.user}</span>
          <span className="timestamp">{data.timestamp}</span>
        </div>
        <div css={message}>{data.lastMessage}</div>
      </div>
    </Content>
  );
};

export default ChatItem;
