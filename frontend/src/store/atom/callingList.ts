import { atom } from 'recoil';
import { v1 } from 'uuid';

type callingListType = {
  id: string;
  list: {
    [key: string]: {
      id: string;
      nickname: string;
      status: string;
    };
  };
};

export const callingListState = atom<callingListType>({
  key: `callingListState/${v1()}`,
  default: {
    id: '',
    list: {},
  },
  dangerouslyAllowMutability: true,
});
