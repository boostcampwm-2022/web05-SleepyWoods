import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // 해당 id의 유저로부터 전화 걸려옴
    socket.on('callRequested', data => {
      const { callerUserId: id, callerNickname: nickname } = data;

      setSend({
        id: id,
        nickname: nickname,
      });
    });
  }, [isSend]);

  useEffect(() => {
    socket.on('callCanceled', data => {
      console.log('통화취소당함!!!');
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

    // 거절이 안 됨
    socket.on('callDenied', data => {
      console.log('통화거절당함!!!');
      const { calleeUserId: id, calleeNickname: nickname } = data;

      friends[id] &&
        setFriends({
          ...friends,
          [id]: {
            ...friends[id],
            status: 'on',
            isCalling: false,
          },
        });

      alert(`${nickname}님이 통화를 거절하셨습니다.`);
    });
  }, []);

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
