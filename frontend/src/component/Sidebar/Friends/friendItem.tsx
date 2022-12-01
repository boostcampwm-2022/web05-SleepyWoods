import Content from '../Content';
import { friendType } from './friends';
import { friendItemWrapper, userName } from './friends.styled';
import message from '../../../assets/icon/messageIcon.svg';
import unfollow from '../../../assets/icon/unfollowIcon.svg';
import axios from 'axios';

const FriendItem = (data: friendType) => {
  const { id, isOnline, name } = data;

  const sendChatting = () => {
    alert(`${name}님과 채팅하기`);
  };

  const unfollowing = async () => {
    const isConfirm = confirm(`${name}님을 언팔로우 하시겠습니까?`);

    if (isConfirm) {
      try {
        await axios.delete(`/api/friendship/${name}`);

        alert(`${name}님을 언팔로우 하였습니다.`);
      } catch {
        alert('언팔로우 실패');
      }
    }
  };

  return (
    <Content draggable={isOnline} key={id}>
      <section id={id} css={friendItemWrapper(isOnline)}>
        <div css={userName(isOnline)}>{name}</div>
        <div>
          <img src={message} alt="채팅하기" onClick={sendChatting}></img>
          <img src={unfollow} alt="친구 끊기" onClick={unfollowing}></img>
        </div>
      </section>
    </Content>
  );
};

export default FriendItem;
