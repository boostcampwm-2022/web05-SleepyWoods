import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import * as style from './chat.styled';

const ChatMessage = ({ chat }: { chat: any }) => {
  // const user = useRecoilValue(userState);
  // const isSender = user.nickname === chat.nickname;

  const isSender =
    'Z-NVwpPpbw7oOjHEn-CYEZ8V9nU3P9IIChz_9PuuVak' === chat.senderId;

  return (
    <li css={style.chatItem(isSender)}>
      <div css={style.chatText(isSender)}>{chat.message}</div>
      <div css={style.chatTime}>{chat.timestamp}</div>
    </li>
  );
};
export default ChatMessage;
