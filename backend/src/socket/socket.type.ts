import { Socket } from 'socket.io';
import {
  directionOptions,
  stateOptions,
  userStateOptions,
} from './enum/player.enum';
import { socialPlatform } from 'src/auth/user.enum';

export type userDataT = {
  id: string;
  nickname: string;
  social: socialPlatform;
  characterName: string;
  x: number;
  y: number;
  direction: directionOptions;
  state: stateOptions;
  userState: userStateOptions;
  walk: number;
  roomName: string;
  callingRoom: string;
};

export interface sleepySocket extends Socket {
  userData?: userDataT;
}
