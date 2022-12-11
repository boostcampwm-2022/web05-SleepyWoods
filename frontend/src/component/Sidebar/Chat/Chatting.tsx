import axios from 'axios';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Content from '../Content';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import * as style from './chat.styled';
import ChatMessage from './ChatMessage';
import { socketState } from '../../../store/atom/socket';
import { calcDate } from './util';
import SeparateTimeLine from './SeparateTimeLine';
import { chatTargetType, privateChatType } from '../../../types/types';

const Chatting = ({
  chatTarget,
  setChatTarget,
}: {
  chatTarget: chatTargetType;
  setChatTarget: Function;
}) => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const [chatDatas, setChatDatas] = useState<any[]>([]);
  const [isClose, setIsClose] = useState(false); // 애니메이션
  const [chatValue, setChatValue] = useState('');
  const chatRef = useRef<null | HTMLUListElement>(null);
  let lastDate = '';

  useEffect(() => {
    // chatRoom 생성
    socket.emit('chatRoomEntered', { targetUserId: chatTarget.id });

    // 채팅 메세지 가져오기
    const getMessage = async () => {
      try {
        const { data } = await axios(
          `/api/chat/content?targetUserId=${chatTarget.id}`
        );

        if (!data.length) return;
        lastDate = data[data.length - 1].timestampe;
        setChatDatas(data);
      } catch (e) {}
    };

    getMessage();

    socket.on('privateChat', (data: privateChatType) => {
      setChatDatas(chatDatas => [...chatDatas, data]);
    });

    return () => {
      socket.emit('chatRoomLeaved', { targetUserId: chatTarget.id });
      socket.removeListener('privateChat');
    };
  }, []);

  // 애니메이션
  const handleChatRoom = () => {
    socket.emit('chatRoomLeaved', { targetUserId: chatTarget.id });
    setIsClose(true);

    setTimeout(() => {
      setChatTarget({ id: '', nickname: '' });
    }, 300);
  };

  // 채팅 input 값 관리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  // Enter 키 클릭 시 업데이트
  const checkEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !chatValue) return;

    const chat = {
      fromUserId: user.id,
      timestamp: Date.now(),
      nickname: user.nickname,
      message: chatValue,
      senderId: user.id,
    };

    socket.emit('privateChat', {
      targetUserId: chatTarget.id,
      message: chatValue,
    });

    setChatDatas([...chatDatas, chat]);
    setChatValue('');
  };

  // 채팅을 보내면 가장 하단(새로운 메세지)으로 이동
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatDatas]);

  return (
    <Content isexpand={true}>
      <div css={style.chatConatiner(isClose)}>
        <div css={style.chatUserBox}>
          <span css={style.chatUserName}>{chatTarget.nickname}</span>
          <button
            type="button"
            css={style.prevBtn}
            onClick={handleChatRoom}></button>
        </div>
        <ul css={style.textWrapper} ref={chatRef}>
          {chatDatas.map((data, idx: number) => {
            const date = calcDate(data.timestamp);
            const checkSameDate = date === lastDate;
            if (!checkSameDate) lastDate = date;

            return (
              <>
                {!checkSameDate && (
                  <SeparateTimeLine key={idx + 'date'} date={date} />
                )}
                <ChatMessage key={idx + 'msg'} chat={data} />
              </>
            );
          })}
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
