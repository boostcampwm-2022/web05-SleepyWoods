import {
  character,
  carouselContainer,
  characterWrapper,
} from './carousel.styled';

import { ArrowButton } from '../Button';
import { hairName } from './hair';

type CarouselType = {
  hairIdx: number;
  setHairIdx: React.Dispatch<React.SetStateAction<number>>;
};

export const Carousel = ({ hairIdx, setHairIdx }: CarouselType) => {
  const hairCnt = Object.keys(hairName).length - 1;

  const minusIdx = () => {
    if (hairIdx - 1 < -1) setHairIdx(hairCnt - 1);
    else setHairIdx(hairIdx - 1);
  };

  const plusIdx = () => {
    if (hairIdx + 1 >= hairCnt) setHairIdx(-1);
    else setHairIdx(hairIdx + 1);
  };

  return (
    <div css={carouselContainer}>
      <ArrowButton type="prev" event={minusIdx} />
      <div css={characterWrapper}>
        <div css={character(hairName[hairIdx])}></div>
      </div>
      <ArrowButton type="next" event={plusIdx} />
    </div>
  );
};
