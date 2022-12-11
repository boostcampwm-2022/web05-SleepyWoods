import Content from '../Content';
import { friendType } from './friends';
import { friendItemWrapper, userName } from './friends.styled';

const UserItem = ({
  friend,
  children,
}: {
  friend: friendType;
  children?: JSX.Element;
}) => {
  const { id, status, nickname } = friend;
  const isOnline = status === 'on';

  return (
    <Content draggable={isOnline}>
      <section id={id} css={friendItemWrapper(isOnline)}>
        <div css={userName(status)}>{nickname}</div>
        {children}
      </section>
    </Content>
  );
};

export default UserItem;
