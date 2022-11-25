import { atom } from 'recoil';

export const musicState = atom<boolean>({
  key: 'musicState',
  default: true,
});

export const snowState = atom<boolean>({
  key: 'snowState',
  default: true,
});
