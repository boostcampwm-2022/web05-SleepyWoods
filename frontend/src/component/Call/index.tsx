import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { friendsState } from '../../store/atom/friends';
import { callingWrapper } from './call.styled';
import CallingItem from './callingItem';

const Call = () => {
  const friends = useRecoilValue(friendsState);
  const friendList = Object.values(friends).filter(value => value.isCalling);

  const [isSend, setSend] = useState({
    id: '',
    nickname: '',
  });

  /* 소켓으로 나에게 통화가 오는 것을 감지해서
  해당 유저 id, nickname 받아오기
  해당 유저의 정보를 isSend에 넣어주기
  
  setSend({
    id: ;
    nickname: ;
  })
  
  */

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
