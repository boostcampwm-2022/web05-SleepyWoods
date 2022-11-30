import { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';
import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { findFriend, friendListWrapper } from './friends.styled';
import { friendsState } from '../../../store/atom/friends';

const FriendList = () => {
  const handleDrag = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    target.classList.toggle('dragging');
  };

  const friends = useRecoilValue(friendsState);
  const friendList = Object.values(friends).filter(value => !value.isCalling);

  return (
    <Content>
      <h2 className="srOnly">친구 목록</h2>
      <ul
        css={friendListWrapper}
        onDragStart={handleDrag}
        onDragEnd={handleDrag}>
        {friendList.map((friend: friendType) => FriendItem(friend))}
      </ul>
      <div css={findFriend}>
        <input type="text" placeholder="추가할 친구 이름" />
      </div>
    </Content>
  );
};

export default FriendList;
