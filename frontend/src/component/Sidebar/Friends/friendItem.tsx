import Content from '../Content';
import { friendType } from './friends';
import { friendItemWrapper, userName } from './friends.styled';
import message from '../../../assets/icon/messageIcon.svg';
import unfollow from '../../../assets/icon/unfollowIcon.svg';
import axios from 'axios';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { friendsState } from '../../../store/atom/friends';
import { sidebarState } from '../../../store/atom/sidebar';
import { chattingState } from '../../../store/atom/chatting';
import { socketState } from '../../../store/atom/socket';
import UserItem from './userItem';

const FriendItem = ({ friend }: { friend: friendType }) => {
  const socket = useRecoilValue(socketState);
  const [friends, setFriends] = useRecoilState(friendsState);
  const setChatTarget = useSetRecoilState(chattingState);
  const setCurrentTab = useSetRecoilState(sidebarState);

  const { id, nickname } = friend;

  const sendChatting = () => {
    socket.emit('chatRoomEntered', { targetUserId: id });
    setChatTarget({
      id: id,
      nickname: nickname,
    });
    setCurrentTab('chatting');
  };

  const unfollowing = async () => {
    const isConfirm = confirm(`${nickname}님을 언팔로우 하시겠습니까?`);

    if (isConfirm) {
      try {
        await axios.delete(`/api/friendship/${nickname}`);

        const newFriend = { ...friends };

        delete newFriend[id];
        setFriends(newFriend);

        alert(`${nickname}님을 언팔로우 하였습니다.`);
      } catch {
        alert('언팔로우 실패');
      }
    }
  };

  return (
    <UserItem friend={friend}>
      <div>
        <button onClick={sendChatting}>
          <img src={message} alt="채팅하기 버튼"></img>
        </button>
        <button onClick={unfollowing}>
          <img src={unfollow} alt="친구 끊기 버튼"></img>
        </button>
      </div>
    </UserItem>
  );
};

export default FriendItem;
