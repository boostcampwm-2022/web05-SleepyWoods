import { atom } from 'recoil';
import { v1 } from 'uuid';

export type callingItemType = {
  id: string;
  nickname: string;
  status: string;
  peerConnection: RTCPeerConnection;
};

type callingListType = {
  id: string;
  list: {
    [key: string]: callingItemType;
  };
};

export const callingListState = atom<callingListType>({
  key: `callingListState/${v1()}`,
  default: {
    id: '',
    list: {},
  },
  dangerouslyAllowMutability: true,
});
