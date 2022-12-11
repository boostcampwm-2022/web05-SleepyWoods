import { Dispatch, SetStateAction } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { callingListState } from '../../store/atom/callingList';
import { friendsState } from '../../store/atom/friends';
import { socketState } from '../../store/atom/socket';
import { callingItem } from './call.styled';

type callingItemType = {
  id: string;
  nickname: string;
  isSend: boolean;
  setSend?: Dispatch<SetStateAction<{ id: string; nickname: string }>>;
};

const CallingItem = ({
  id,
  nickname,
  isSend,
  setSend = undefined,
}: callingItemType) => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const [callingList, setCallingList] = useRecoilState(callingListState);
  const socket = useRecoilValue(socketState);

  const handleRejectCall = () => {
    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'on',
          isCalling: false,
        },
      });

    delete callingList.list[id];

    setSend &&
      setSend({
        id: '',
        nickname: '',
      });

    if (isSend) {
      console.log('통화 취소하기!!!!');
      socket.emit('callCanceled', {
        calleeUserId: id,
      });
    } else {
      console.log('통화 거절하기!!!!');
      socket.emit('callRejected', {
        callerUserId: id,
      });
    }

    socket.emit('callLeaved');
  };

  const handleAcceptCall = () => {
    // 해당 webRTC 연결 및 연결 중은 false로 변경
    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          isCalling: false,
        },
      });
  };

  return (
    <section css={callingItem}>
      <span>{nickname}</span>
      {isSend ? (
        <section>
          <span>연결 중 ···</span>
          <button className="reject" onClick={handleRejectCall}></button>
        </section>
      ) : (
        <section>
          <button className="accept" onClick={handleAcceptCall}></button>
          <button className="reject" onClick={handleRejectCall}></button>
        </section>
      )}
    </section>
  );
};

export default CallingItem;
