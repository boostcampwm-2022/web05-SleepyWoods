import { MouseEvent, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { callingListState } from '../../../store/atom/callingList';
import { friendsState } from '../../../store/atom/friends';
import Content from '../Content';
import { callingList } from './friends.styled';
import UserItem from './userItem';
import { v1 } from 'uuid';
import { socketState } from '../../../store/atom/socket';
import { userState } from '../../../store/atom/user';
import { configuration } from '../../Call/config';

const CallingList = () => {
  const [callingRoom, setCallingRoom] = useRecoilState(callingListState);
  const [friends, setFriends] = useRecoilState(friendsState);
  const myValue = useRecoilValue(userState);

  const socket = useRecoilValue(socketState);

  const callingFriendList = Object.values(callingRoom.list);

  useEffect(() => {
    // callingRoom의 멤버가 바뀔 때마다 갱신
    socket.on('callingRoomUserStateChanged', data => {
      const { callingRoomUserData } = data;
      console.log('callingroom 상태가 변경되었습니다.', callingRoomUserData);
      const tempList: any = {};
      callingRoomUserData.forEach((user: { [key: string]: string }) => {
        if (user.id === myValue.id) return;

        const connection = callingRoom.list[user.id]?.peerConnection
          ? callingRoom.list[user.id]?.peerConnection
          : new RTCPeerConnection(configuration);

        tempList[user.id] = {
          id: user.id,
          nickname: user.nickname,
          status: user.userState,
          peerConnection: connection,
        };
      });

      const len = Object.values(tempList).length;
      if (len) {
        setCallingRoom({
          ...callingRoom,
          list: tempList,
        });
      } else {
        setCallingRoom({
          id: '',
          list: {},
        });

        // 아무도 없으면 방 터뜨리기
        socket.emit('callLeaved');
      }
    });

    return () => {
      socket.removeListener('callingRoomUserStateChanged');
    };
  }, [myValue, callingRoom]);

  const handleDrag = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const draggingElement = document.querySelector('.dragging');

    if (target.tagName !== 'UL' || !draggingElement) return;

    // dragging 중인 user의 id
    const id = draggingElement.children[0].id;

    setFriends({
      ...friends,
      [id]: {
        ...friends[id],
        status: 'busy',
        isCalling: true,
      },
    });

    const callingRoomId = callingRoom.id || v1();
    setCallingRoom({
      id: callingRoomId,
      list: {
        ...callingRoom.list,
        [id]: {
          id: id,
          nickname: friends[id].nickname,
          status: 'callRequesting',
          peerConnection: new RTCPeerConnection(configuration),
        },
      },
    });

    // 해당 id의 유저에게 통화 요청
    socket.emit('callRequested', {
      calleeUserId: id,
      callingRoom: callingRoomId,
    });

  };

  return (
    <Content>
      <h2 className="srOnly">전화연결 목록</h2>
      <ul
        css={callingList}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrag}>
        {callingFriendList.map(friend => (
          <UserItem friend={friend} key={friend.id} />
        ))}
      </ul>
    </Content>
  );
};

export default CallingList;
