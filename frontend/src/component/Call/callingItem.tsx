import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { friendsState } from '../../store/atom/friends';
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

  const handleRejectCall = () => {
    friends[id] &&
      setFriends({
        ...friends,
        [id]: {
          ...friends[id],
          status: 'online',
          isCalling: false,
        },
      });

    setSend &&
      setSend({
        id: '',
        nickname: '',
      });
    // socket: 해당 친구 online으로 변경
  };

  const handleAcceptCall = () => {
    // 해당 webRTC 연결 및 연결 중은 false로 변경
    friends.id &&
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
