import Content from '../Content';
import { chatInfo, chatItemWrapper, message } from './chat.styled';

const ChatRoom = ({ data }: { data: any }) => {
  const { unReadCount, targetUserId } = data;

  return (
    <Content id={data.targetUserId} isCursor={true}>
      <div css={chatItemWrapper}>
        <div css={chatInfo(unReadCount)}>
          <span className="user">{targetUserId}</span>
          <span className="timestamp">{'00:00'}</span>
        </div>
        <div css={message}>
          {
            '마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지 '
          }
        </div>
      </div>
    </Content>
  );
};

export default ChatRoom;
