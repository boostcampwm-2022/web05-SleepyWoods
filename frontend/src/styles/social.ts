import { colorType } from './color';

type socialType = {
  [key: string]: colorType;
};

const social: socialType = {
  background: {
    naver: '#26C825',
    kakao: '#FFEB00',
    google: '#FFFFFF',
  },
  color: {
    naver: '#FFFFFF',
    kakao: '#222222',
    google: '#2222EE',
  },
};

export default social;
