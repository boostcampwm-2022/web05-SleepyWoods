import { atom } from 'recoil';

export interface friendsProps {
  [key: string]: {
    name: string;
    isOnline: boolean;
    isCalling: boolean;
  };
}

export const friendsState = atom<friendsProps>({
  key: 'friendsState',
  default: {
    안현서: {
      isOnline: true,
      name: '안현서',
      isCalling: false,
    },
    원종빈: {
      isOnline: true,
      name: '원종빈',
      isCalling: true,
    },
    강성준: {
      isOnline: true,
      name: '강성준',
      isCalling: true,
    },
    이형진: {
      isOnline: true,
      name: '이형진',
      isCalling: false,
    },
    안현서2: {
      isOnline: false,
      name: '안현서2',
      isCalling: false,
    },
    원종빈2: {
      isOnline: false,
      name: '원종빈2',
      isCalling: false,
    },
    강성준2: {
      isOnline: true,
      name: '강성준2',
      isCalling: false,
    },
    이형진2: {
      isOnline: true,
      name: '이형진2',
      isCalling: false,
    },
  },
});
