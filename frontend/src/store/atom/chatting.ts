import { atom } from 'recoil';
import { v1 } from 'uuid';

export const chattingState = atom<string>({
  key: `chattingState/${v1()}`,

  default: '',
});
