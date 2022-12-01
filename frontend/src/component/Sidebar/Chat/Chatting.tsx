import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Content from '../Content';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import * as style from './chat.styled';
import { calcTime, nowTime } from './util';
import ChatMessage from './ChatMessage';

const Chatting = ({
  chatTarget,
  setChatTarget,
}: {
  chatTarget: string;
  setChatTarget: Function;
}) => {
  const user = useRecoilValue(userState);
  const [chatDatas, setChatDatas] = useState<any[]>([]);
  const [isClose, setIsClose] = useState(false); // 애니메이션
  const [chatValue, setChatValue] = useState('');
  const [lastId, setLastId] = useState(0);
  const chatRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    // 채팅 메세지 가져오기
    const getMessage = async () => {
      try {
        const { data } = await axios(
          `/api/chat/content?targetUserId=${chatTarget}`
        );

        data.forEach((msg: any) => (msg.timestamp = calcTime(msg.timestamp)));
        setLastId(data[data.length - 1].id);
        setChatDatas(data);
      } catch (e) {}
    };

    getMessage();
  }, []);

  // 애니메이션
  const handleChatRoom = () => {
    setIsClose(true);

    setTimeout(() => {
      setChatTarget('');
    }, 300);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !chatValue) return;

    const chat = {
      id: lastId + 1,
      timestamp: nowTime(),
      nickname: user.nickname,
      message: chatValue,
    };

    setChatDatas([...chatDatas, chat]);
    setLastId(lastId + 1);
    setChatValue('');
  };

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatDatas]);

  return (
    <Content isexpand={true}>
      <div css={style.chatConatiner(isClose)}>
        <div css={style.chatUserBox}>
          <span css={style.chatUserName}>{'닉네임'}</span>
          <button
            type="button"
            css={style.prevBtn}
            onClick={handleChatRoom}></button>
        </div>
        <ul css={style.textWrapper} ref={chatRef}>
          {chatDatas.map((data: any) => (
            <ChatMessage chat={data} />
          ))}
        </ul>
        <input
          type="text"
          css={style.chattingInput}
          value={chatValue}
          onChange={handleChange}
          onKeyUp={checkEnter}
        />
      </div>
    </Content>
  );
};

export default Chatting;
