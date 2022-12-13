import { atom } from 'recoil';
import { v1 } from 'uuid';

export type userProps = {
  id: string;
  nickname: string;
  hair: string;
};

export const userState = atom<userProps>({
  key: `userState/${v1()}`,
  default: {
    id: '',
    nickname: '',
    hair: '',
  },
  dangerouslyAllowMutability: true,
});
