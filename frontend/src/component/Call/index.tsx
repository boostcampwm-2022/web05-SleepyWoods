import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { friendsState } from '../../store/atom/friends';
import { socketState } from '../../store/atom/socket';
import { callingWrapper } from './call.styled';
import CallingItem from './callingItem';

const Call = () => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const socket = useRecoilValue(socketState);
  let friendList = Object.values(friends).filter(value => value.isCalling);

  const [isSend, setSend] = useState({
    id: '',
    nickname: '',
  });

  // 해당 id의 유저로부터 전화 걸려옴
  socket.on('callRequested', data => {
    const { callerUserId: id, callerNickname: nickname } = data;

    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'busy',
          isCalling: false,
        },
      });

    setSend({
      id: id,
      nickname: nickname,
    });
  });

  socket.on('callCanceled', data => {
    const { callerUserId: id } = data;

    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'on',
          isCalling: false,
        },
      });

    setSend({
      id: '',
      nickname: '',
    });
  });

  socket.on('callRejected', data => {
    const { calleeUserId: id } = data;

    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'on',
          isCalling: false,
        },
      });
  });

  socket.on('callEntered', data => {
    const { calleeUserId: id } = data;

    console.log(`${id}님이 통화를 수락하셨습니다.`);
  });

  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <div css={callingWrapper}>
      {friendList.map(friend => (
        <CallingItem
          key={friend.id}
          id={friend.id}
          nickname={friend.nickname}
          isSend={true}
        />
      ))}
      {isSend.id && (
        <CallingItem
          id={isSend.id}
          nickname={isSend.nickname}
          isSend={false}
          setSend={setSend}
        />
      )}
    </div>
  );
};

export default Call;
