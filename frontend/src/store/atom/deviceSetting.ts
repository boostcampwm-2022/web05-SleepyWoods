import { atom } from 'recoil';
import { stringObjectType, booleanObjectType } from '../../types/types';
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

export const webRTCState = atom<booleanObjectType>({
  key: `webRTCState/${v1()}`,
  default: {
    cam: true,
    mic: true,
  },
});
