import CallingList from './callingList';
import FriendList from './friendList';
import { FriendsTabWrapper } from './friends.styled';

const Friends = () => {
  return (
    <ul css={FriendsTabWrapper}>
      <FriendList />
      <CallingList />
    </ul>
  );
};

export default Friends;
