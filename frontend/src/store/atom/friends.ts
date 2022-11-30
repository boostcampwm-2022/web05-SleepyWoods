import { atom } from 'recoil';

export interface friendsProps {
  [key: string]: {
    id: string;
    name: string;
    isOnline: boolean;
    isCalling: boolean;
  };
}

export const friendsState = atom<friendsProps>({
  key: 'friendsState',
  default: {
    '1': {
      id: '1',
      isOnline: false,
      name: '안현서',
      isCalling: false,
    },
    '2': {
      id: '2',
      isOnline: true,
      name: '원종빈',
      isCalling: true,
    },
    '3': {
      id: '3',
      isOnline: true,
      name: '강성준',
      isCalling: true,
    },
    '4': {
      id: '4',
      isOnline: true,
      name: '이형진',
      isCalling: false,
    },
    '5': {
      id: '5',
      isOnline: false,
      name: '안현서',
      isCalling: false,
    },
    '6': {
      id: '6',
      isOnline: false,
      name: '원종빈',
      isCalling: false,
    },
    '7': {
      id: '7',
      isOnline: true,
      name: '강성준',
      isCalling: false,
    },
    '8': {
      id: '8',
      isOnline: true,
      name: '이형진',
      isCalling: false,
    },
  },
});
