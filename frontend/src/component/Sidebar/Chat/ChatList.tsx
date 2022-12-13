import Content from '../Content';
import ChatRoom from './ChatRoom';
import { chatWrapper, emptyMessage } from './chat.styled';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../../store/atom/socket';
import axios from 'axios';
import { chatRoomType } from '../../../types/types';

const ChatList = ({ setChatTarget }: { setChatTarget: Function }) => {
  const socket = useRecoilValue(socketState);
  const [roomList, setRoomList] = useState<chatRoomType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClose, setIsClose] = useState(false); // 애니메이션

  useEffect(() => {
    // 채팅 목록 가져오기
    const getRoomList = async () => {
      try {
        const { data } = await axios('/api/chat/roomList');

        console.log(data);
        setRoomList(() => data);
        setIsLoaded(true);
      } catch (e) {}
    };

    getRoomList();

    socket.on('privateChat', () => {
      getRoomList();
    });

    return () => {
      socket.removeListener('privateChat');
    };
  }, []);

  const selectChatRoom = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLUListElement;
    const targetLi = target.closest('li');

    if (!targetLi) return;
    const id = targetLi.dataset.id;
    const nickname = targetLi.dataset.nickname;

    setIsClose(true);
    setTimeout(() => {
      setChatTarget({ id, nickname });
    }, 300);
  };

  return (
    <Content isexpand={true}>
      <ul css={chatWrapper(isClose)} onClick={selectChatRoom}>
        {isLoaded &&
          (roomList.length ? (
            roomList.map(data => (
              <ChatRoom key={data.targetUserId} data={data} />
            ))
          ) : (
            <div css={emptyMessage}>😀 친구와 대화를 시작해보세요!</div>
          ))}
      </ul>
    </Content>
  );
};

export default ChatList;
