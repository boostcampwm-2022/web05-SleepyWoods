import Content from '../Content';
import { friendType } from './friends';
import { friendItemWrapper, userName } from './friends.styled';
import message from '../../../assets/icon/messageIcon.svg';
import unfollow from '../../../assets/icon/unfollowIcon.svg';

const FriendItem = (data: friendType) => {
  const { isOnline, name } = data;

  const sendChatting = () => {
    alert(`${name}님과 채팅하기`);
  };

  const unfollowing = () => {
    alert(`${name}님을 언팔로우 하시겠습니까?`);
  };

  return (
    <Content draggable={true} key={name}>
      <section css={friendItemWrapper}>
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
