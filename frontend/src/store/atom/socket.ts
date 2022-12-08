import { atom } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { getCookieValue } from '../../page/Main';
import { v1 } from 'uuid';

export const socketState = atom<Socket>({
  key: `socketState/${v1()}`,
  default: io(location.origin, {
    autoConnect: false,
    extraHeaders: {
      authorization: getCookieValue('accessToken'),
      room: 'town',
    },
  }),
  dangerouslyAllowMutability: true,
});
