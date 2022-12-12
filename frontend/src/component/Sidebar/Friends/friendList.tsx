import { MouseEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { friendListWrapper } from './friends.styled';
import { friendsState } from '../../../store/atom/friends';
import Search from './search';
import { socketState } from '../../../store/atom/socket';

const FriendList = () => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const friendList = Object.values(friends).filter(value => true);
  const socket = useRecoilValue(socketState);

  socket.on('userCreated', data => {
    const { id, userState } = data;

    setFriends({
      ...friends,
      [id]: {
        ...friends[id],
        status: userState,
      },
    });
  });

  socket.on('userDataChanged', data => {
    const { id, nickname } = data;

    if (!friends[id]) return;

    const newFriends = { ...friends };
    newFriends[id] = {
      ...newFriends[id],
      nickname: nickname,
    };

    setFriends(newFriends);
  });

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
          friendList.map((friend: friendType) => (
            <FriendItem friend={friend} key={friend.id} />
          ))
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
