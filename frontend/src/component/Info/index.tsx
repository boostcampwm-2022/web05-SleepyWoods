import * as style from './info.styled';
import Users from './Users';
import Walk from './Walk';

const Info = () => {
  return (
    <ul css={style.infoBox}>
      <Walk />
      <Users />
    </ul>
  );
};

export default Info;
