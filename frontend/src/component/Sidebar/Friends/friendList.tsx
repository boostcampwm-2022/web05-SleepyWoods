import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { friendListWrapper } from './friends.styled';

const data = [
  {
    isOnline: false,
    name: '안현서',
  },
  {
    isOnline: true,
    name: '원종빈',
  },
  {
    isOnline: true,
    name: '강성준',
  },
  {
    isOnline: true,
    name: '이형진',
  },
];

const FriendList = () => {
  return (
    <Content>
      <h2 className="srOnly">친구 목록</h2>
      <ul css={friendListWrapper}>
        {data.map((friend: friendType) => FriendItem(friend))}
      </ul>
    </Content>
  );
};

export default FriendList;
