import { atom } from 'recoil';
import { stringObjectType } from '../../types/types';

export const devicePermissionState = atom<boolean>({
  key: 'devicePermissionState',
  default: false,
});

export const devicesState = atom<stringObjectType>({
  key: 'devicesState',
  default: {
    speaker: 'default',
    audio: 'default',
    video: 'default',
  },
});
