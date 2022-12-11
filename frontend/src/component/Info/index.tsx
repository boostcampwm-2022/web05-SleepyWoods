import * as style from './info.styled';
import Help from './Help';
import Users from './Users';
import Walk from './Walk';

const Info = () => {
  return (
    <ul css={style.infoBox}>
      <Help />
      <Walk />
      <Users />
    </ul>
  );
};

export default Info;
