import { atom } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { getCookieValue } from '../../page/Main';

export const socketState = atom<Socket>({
  key: 'socketState',
  default: io('localhost:3333', {
    autoConnect: false,
    extraHeaders: {
      authorization: getCookieValue('accessToken'),
      room: 'town',
    },
  }),
  dangerouslyAllowMutability: true,
});
