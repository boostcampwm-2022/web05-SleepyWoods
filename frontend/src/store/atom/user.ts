import { atom } from 'recoil';

export interface userProps {
  nickname: string;
  hair: number;
}

export const userState = atom<userProps>({
  key: 'userState',
  default: {
    nickname: '',
    hair: -1,
  },
});
