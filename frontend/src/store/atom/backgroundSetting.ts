import { atom } from 'recoil';

export const musicState = atom<boolean>({
  key: 'musicState',
  default: false,
});

export const snowState = atom<boolean>({
  key: 'snowState',
  default: true,
});
