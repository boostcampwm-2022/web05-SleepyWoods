import { atom } from 'recoil';
import { v1 } from 'uuid';

export const chattingState = atom({
  key: `chattingState/${v1()}`,

  default: { id: '', nickname: '' },
});
