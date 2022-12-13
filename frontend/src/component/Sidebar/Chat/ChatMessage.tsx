import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import { privateChatType } from '../../../types/types';
import * as style from './chat.styled';
import { calcTimeFromMs } from './util';

const ChatMessage = ({ chat }: { chat: privateChatType }) => {
  const user = useRecoilValue(userState);
  const isSender = user.id === chat.senderId;

  return (
    <li css={style.chatItem(isSender)}>
      <div css={style.chatText(isSender)}>{chat.message}</div>
      <div css={style.chatTime}>{calcTimeFromMs(chat.timestamp, false)}</div>
    </li>
  );
};
export default ChatMessage;
