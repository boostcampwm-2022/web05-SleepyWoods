import { MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { callingListState } from '../../../store/atom/callingList';
import { friendsState } from '../../../store/atom/friends';
import Content from '../Content';
import { callingList } from './friends.styled';
import UserItem from './userItem';

const CallingList = () => {
  const [callingfriendList, setCallingList] = useRecoilState(callingListState);
  const friendList = Object.values(callingfriendList.list);
  const [friends, setFriends] = useRecoilState(friendsState);

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
        status: 'busy',
        isCalling: true,
      },
    });

    // socket: 해당 친구 busy로 변경
  };

  return (
    <Content>
      <h2 className="srOnly">전화연결 목록</h2>
      <ul css={callingList} onDragOver={handleDragOver}>
        {friendList.map(friend => (
          <UserItem friend={friend} key={friend.id} />
        ))}
      </ul>
    </Content>
  );
};

export default CallingList;
