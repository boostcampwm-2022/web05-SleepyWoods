import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { friendsState } from '../../store/atom/friends';
import { socketState } from '../../store/atom/socket';
import { callingWrapper } from './call.styled';
import CallingItem from './callingItem';

const Call = () => {
  const friends = useRecoilValue(friendsState);
  const friendList = Object.values(friends).filter(value => value.isCalling);
  const socket = useRecoilValue(socketState);

  const [isSend, setSend] = useState({
    id: '',
    nickname: '',
  });

  useEffect(() => {
    // 해당 id의 유저로부터 전화 걸려옴
    socket.on('callRequested', data => {
      const { callerUserId: id, callerNickname: nickname } = data;

      setSend({
        ...isSend,
        id: id,
        nickname: nickname,
      });
    });
  }, [isSend]);

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
