import CarouselContent from './CarouselContent';
import NickNameContent from './NickNameContent';
import { mypageWrapper } from './mypage.styled';

const Mypage = () => {
  return (
    <ul css={mypageWrapper}>
      <CarouselContent />
      <NickNameContent />
    </ul>
  );
};
export default Mypage;
