import * as style from './info.styled';
import walk from '../../assets/icon/walk.svg';

const Walk = () => {
  return <li css={style.info(walk)}>걸음수</li>;
};
export default Walk;
