import { atom } from 'recoil';
import { io, Socket } from 'socket.io-client';

export const socketState = atom<Socket>({
  key: 'socketState',
  default: io('ws://localhost:3333'),
});
