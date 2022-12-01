import { MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { friendsState } from '../../../store/atom/friends';
import Content from '../Content';
import FriendItem from './friendItem';
import { friendType } from './friends';
import { callingList } from './friends.styled';

const CallingList = () => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const friendList = Object.values(friends).filter(value => value.isCalling);

  const handleDragOver = (e: MouseEvent) => {
    // dragenter 이벤트와 동작이 겹칠수 있기 때문에 e.preventDefault() 로 제한하며 둘이 결합하여 사용함
    e.preventDefault();

    const target = e.target as HTMLElement;
    const draggingElement = document.querySelector('.dragging');

    if (target.tagName !== 'UL' || !draggingElement) return;

    const id = draggingElement.children[0].id;

    setFriends({
      ...friends,
      [id]: {
        ...friends[id],
        isCalling: true,
      },
    });
  };

  return (
    <Content>
      <h2 className="srOnly">전화연결 목록</h2>
      <ul css={callingList} onDragOver={handleDragOver}>
        {friendList.map((friend: friendType) => FriendItem(friend))}
      </ul>
    </Content>
  );
};

export default CallingList;
