import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { findFriend, friendListWrapper } from './friends.styled';

const data = [
  {
    id: '1',
    isOnline: false,
    name: '안현서',
  },
  {
    id: '2',
    isOnline: true,
    name: '원종빈',
  },
  {
    id: '3',
    isOnline: true,
    name: '강성준',
  },
  {
    id: '4',
    isOnline: true,
    name: '이형진',
  },
  {
    id: '5',
    isOnline: false,
    name: '안현서',
  },
  {
    id: '6',
    isOnline: false,
    name: '원종빈',
  },
  {
    id: '7',
    isOnline: true,
    name: '강성준',
  },
  {
    id: '8',
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
      <div css={findFriend}>
        <input type="text" placeholder="추가할 친구 이름" />
      </div>
    </Content>
  );
};

export default FriendList;
