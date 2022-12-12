import { Socket } from 'socket.io-client';
import { userProps } from '../store/atom/user';

export type childrenType = {
  children: JSX.Element | JSX.Element[];
};

export type stringObjectType = {
  [key: string]: string;
};

export type chatType = {
  type: string;
  timestamp: string;
  nickname: string | number;
  message: string;
};

export type userType = {
  callingRoom: string;
  characterName: string;
  direction: string;
  exp: number;
  iat: number;
  id: string;
  nickname: string;
  roomName: string;
  social: string;
  state: string;
  userState: string;
  walk: number;
  x: number;
  y: number;
};

export type gameInitType = userProps & {
  socket: Socket;
};

export type lastMsgType = {
  id: number;
  timestamp: string;
  message: string;
};

export type chatRoomType = {
  lastMsg: lastMsgType;
  roomId: number;
  targetUserId: string;
  targetUserNickname: string;
  unReadCount: number;
};

export type privateChatType = {
  id: number;
  roomId: number;
  timestamp: string;
  message: string;
  senderId: string;
};

export type chatTargetType = {
  id: string;
  nickname: string;
};

export type boardType = {
  category: string;
  content: string;
  created_at: string;
  id: number;
  liked: boolean;
  nickname: string;
  userid: string;
};

export type walkType = {
  month: number;
  nickname: string;
  userid: string;
  walkcount: string;
  year: number;
};
