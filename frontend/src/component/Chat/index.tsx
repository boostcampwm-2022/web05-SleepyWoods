import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atom/user';
import * as style from './chat.styled';
import ChatContent from './ChatContent';

const Chat = () => {
  const user = useRecoilValue(userState);
  const date = new Date();
  const [isExtend, setIsExtend] = useState(true);
  const [chatDatas, setChatDatas] = useState<any[]>([]);
  const [chatValue, setChatValue] = useState('');

  const handleExtend = () => {
    setIsExtend(!isExtend);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  const checkEnter = (e: any) => {
    if (e.key !== 'Enter' || !chatValue) return;

    const chat = {
      time: `${date.getHours()}:${date.getMinutes()}`,
      nickname: user.nickname,
      text: chatValue,
    };

    setChatDatas([...chatDatas, chat]);
    setChatValue('');
  };

  return (
    <section css={style.chatContainer(isExtend)}>
      <button
        type="button"
        css={style.extendBtn(isExtend)}
        onClick={handleExtend}></button>

      <ul css={style.chatText(isExtend)}>
        {chatDatas.map((data: any, idx) => (
          <ChatContent key={idx} data={data} />
        ))}
      </ul>

      <div css={style.chatInputContainer}>
        <input
          type="text"
          css={style.chatInput}
          value={chatValue}
          onChange={handleChange}
          onKeyUp={checkEnter}
        />
      </div>
    </section>
  );
};

export default Chat;
