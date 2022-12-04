import { atom } from 'recoil';
import { v1 } from 'uuid';

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
