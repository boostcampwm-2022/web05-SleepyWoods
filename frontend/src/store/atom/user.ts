import { atom } from 'recoil';

export interface userProps {
  nickname: string;
  hair: string;
}

export const userState = atom<userProps>({
  key: 'userState',
  default: {
    nickname: '',
    hair: '',
  },
});
