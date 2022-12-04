import { MouseEvent } from 'react';
import { useRecoilValue } from 'recoil';
import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { friendListWrapper } from './friends.styled';
import { friendsState } from '../../../store/atom/friends';
import Search from './search';

const FriendList = () => {
  const friends = useRecoilValue(friendsState);
  const friendList = Object.values(friends).filter(value => !value.isCalling);

  const handleDrag = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    target.classList.toggle('dragging');
  };

  return (
    <Content>
      <h2 className="srOnly">친구 목록</h2>
      <ul
        css={friendListWrapper}
        onDragStart={handleDrag}
        onDragEnd={handleDrag}>
        {friendList.length ? (
          friendList.map((friend: friendType) => FriendItem(friend))
        ) : (
          <div>
            친구를 추가하고 <br />
            함께 플레이 해보세요:)
          </div>
        )}
      </ul>
      <Search />
    </Content>
  );
};

export default FriendList;
