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
  setConnectVideo: Dispatch<SetStateAction<boolean>>;
  setSend?: Dispatch<SetStateAction<{ id: string; nickname: string }>>;
};

const CallingItem = ({
  id,
  nickname,
  isSend,
  setConnectVideo,
  setSend = undefined,
}: callingItemType) => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const [callingList, setCallingList] = useRecoilState(callingListState);
  const socket = useRecoilValue(socketState);

  const handleRejectCall = () => {
    friends[id] &&
      setFriends(friends => ({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'on',
          isCalling: false,
        },
      }));
    delete callingList.list[id];

    // 내가 나가기 버튼 누르면!!
    // 안에 남아잇는 사람들이 close ->
    // delete videoRef.get("성준이").close()
    // delete videoRef.delete("성준이")
    // pcRef COnnect -> 각 사람마다 new Connection
    // 전역 map으로 관리
    // socketon -> videoRef.geT("성준이") -> ice ...

    setSend &&
      setSend({
        id: '',
        nickname: '',
      });

    if (isSend) {
      console.log('취소함');
      socket.emit('callCanceled', {
        calleeUserId: id,
      });
    } else {
      console.log('거절함');
      socket.emit('callRejected', {
        callerUserId: id,
      });
    }

    socket.emit('callLeaved');
  };

  const handleAcceptCall = () => {
    socket.emit('callEntered', {
      callerUserId: id,
    });

    setSend &&
      setSend({
        id: '',
        nickname: '',
      });

    setConnectVideo(() => true);
    console.log('callEntered emit:', id);
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
