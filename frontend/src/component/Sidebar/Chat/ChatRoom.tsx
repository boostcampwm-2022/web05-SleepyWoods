import Content from '../Content';
import { chatInfo, chatItemWrapper, message } from './chat.styled';
import { calcTime, calcTimeFromMs } from './util';

const ChatRoom = ({ data }: { data: any }) => {
  const { unReadCount, targetUserNickname, lastMsg } = data;

  return (
    <Content
      id={data.targetUserId}
      nickname={data.targetUserNickname}
      isCursor={true}>
      <div css={chatItemWrapper}>
        <div css={chatInfo(unReadCount)}>
          <span className="user">{targetUserNickname}</span>
          <span className="timestamp">
            {lastMsg ? calcTimeFromMs(Date.parse(lastMsg.timestamp)) : ''}
          </span>
        </div>
        <div css={message}>
          {lastMsg ? lastMsg.message : '아직 나눈 채팅이 없어요🥲'}
        </div>
      </div>
    </Content>
  );
};

export default ChatRoom;
