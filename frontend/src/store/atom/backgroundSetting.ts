import { atom } from 'recoil';
import { v1 } from 'uuid';

export const musicState = atom<boolean>({
  key: `musicState/${v1()}`,
  default: false,
});

export const snowState = atom<boolean>({
  key: `snowState/${v1()}`,
  default: true,
});
