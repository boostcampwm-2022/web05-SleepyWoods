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
  default: {},
});
