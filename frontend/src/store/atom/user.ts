import { atom } from 'recoil';

export interface userProps {
  id: string;
  nickname: string;
  hair: string;
}

export const userState = atom<userProps>({
  key: 'userState',
  default: {
    id: '',
    nickname: '',
    hair: '',
  },
});
