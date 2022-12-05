import Content from '../Content';
import { friendType } from './friends';
import { friendItemWrapper, userName } from './friends.styled';
import message from '../../../assets/icon/messageIcon.svg';
import unfollow from '../../../assets/icon/unfollowIcon.svg';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { friendsState } from '../../../store/atom/friends';
import { sidebarState } from '../../../store/atom/sidebar';
import { chattingState } from '../../../store/atom/chatting';

const FriendItem = ({ friend }: { friend: friendType }) => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const setChatTarget = useSetRecoilState(chattingState);
  const setCurrentTab = useSetRecoilState(sidebarState);

  const { id, isOnline, isCalling, nickname } = friend;

  const sendChatting = () => {
    setChatTarget(id);
    setCurrentTab('chatting');
  };

  const unfollowing = async () => {
    const isConfirm = confirm(`${nickname}님을 언팔로우 하시겠습니까?`);

    if (isConfirm) {
      try {
        await axios.delete(`/api/friendship/${nickname}`);

        const newFriend = { ...friends };

        delete newFriend[nickname];
        setFriends(newFriend);

        alert(`${nickname}님을 언팔로우 하였습니다.`);
      } catch {
        alert('언팔로우 실패');
      }
    }
  };

  return (
    <Content draggable={isOnline}>
      <section id={id} css={friendItemWrapper(isOnline)}>
        <div css={userName(isOnline)}>{nickname}</div>
        <div>
          <button onClick={sendChatting}>
            <img src={message} alt="채팅하기 버튼"></img>
          </button>
          <img src={unfollow} alt="친구 끊기 버튼" onClick={unfollowing}></img>
          {isCalling && <div></div>}
        </div>
      </section>
    </Content>
  );
};

export default FriendItem;
