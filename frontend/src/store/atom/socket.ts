import { atom } from 'recoil';
import { io, Socket } from 'socket.io-client';
import { getCookieValue } from '../../page/Main';
import { v1 } from 'uuid';

const path = location.origin.includes('localhost')
  ? 'http://localhost:3333'
  : 'https://sleepywoods.kr';

export const socketState = atom<Socket>({
  key: `socketState/${v1()}`,
  default: io(path, {
    autoConnect: false,
    extraHeaders: {
      authorization: getCookieValue('accessToken'),
      room: 'town',
    },
  }),
  dangerouslyAllowMutability: true,
});
