import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface friendsProps {
  [key: string]: {
    id: string;
    nickname: string;
    isOnline: boolean;
    isCalling: boolean;
  };
}

export const friendsState = atom<friendsProps>({
  key: `friendsState/${v1()}`,
  default: {},
  dangerouslyAllowMutability: true,
});
