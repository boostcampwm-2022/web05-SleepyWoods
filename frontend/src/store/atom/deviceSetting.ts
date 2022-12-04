import { atom } from 'recoil';
import { stringObjectType } from '../../types/types';
import { v1 } from 'uuid';

export const devicePermissionState = atom<boolean>({
  key: `devicePermissionState/${v1()}`,

  default: false,
});

export const devicesState = atom<stringObjectType>({
  key: `devicesState/${v1()}`,
  default: {
    speaker: 'default',
    audio: 'default',
    video: 'default',
  },
});
