import { atom } from 'recoil';
import { v1 } from 'uuid';

export const sidebarState = atom<string>({
  key: `sidebarState/${v1()}`,

  default: 'friends',
});
