import Content from '../Content';
import ChatItem from './chatItem';
import { chatData } from './chatData';
import { chatContainer, chatWrapper } from './chat.styled';

const Chat = () => {
  return (
    <ul css={chatContainer}>
      <Content isexpand={true}>
        <ul css={chatWrapper}>
          {chatData.map((data: any) => (
            <ChatItem key={data.user} data={data} />
          ))}
        </ul>
      </Content>
    </ul>
  );
};

export default Chat;
