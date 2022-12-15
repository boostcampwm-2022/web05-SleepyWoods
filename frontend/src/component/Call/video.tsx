import React, { Dispatch, SetStateAction } from 'react';
import { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import {
  callingItemType,
  callingListState,
} from '../../store/atom/callingList';
import * as style from './call.styled';
import RemoteVideo from './remoteVideo';
import { userState } from '../../store/atom/user';
import { webRTCState } from '../../store/atom/deviceSetting';
import run from '../../assets/run.gif';
import camOn from '../../assets/icon/cam-on.svg';
import camOff from '../../assets/icon/cam-off.svg';
import micOn from '../../assets/icon/mic-on.svg';
import micOff from '../../assets/icon/mic-off.svg';

const Video = ({
  connectVideo,
  setConnectVideo,
}: {
  connectVideo: boolean;
  setConnectVideo: (value: boolean) => void;
}) => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const [webRTC, setWebRTC] = useRecoilState(webRTCState);
  const [callingList, setCallingList] = useRecoilState(callingListState);

  const callingUser = callingList.list;
  const callingUserList = Object.values(callingList.list);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const connectButtonText = `${user.nickname} 외 ${callingUserList.length}명`;

  // sender useEffect
  useEffect(() => {
    // 새 사람이 들어오면 이는 서버에서 알려주고, 기존 사람들은 이를 감지하여 각자 offer를 생성해 줍시다~~~~
    socket.on('newbieEntered', async payload => {
      const { newbieId }: { newbieId: string } = payload;

      const peerConnection: RTCPeerConnection =
        callingUser[newbieId].peerConnection;

      callingUser[newbieId].peerConnection = await createNewOffer(
        peerConnection,
        newbieId
      );
    });

    socket.on('remoteAnswer', async function (payload) {
      const { answer, newbieId } = payload;

      await handleRemoteAnswer(answer, newbieId);
    });

    socket.on('newOffer', async payload => {
      const { offer, senderUserId } = payload;
      const peerConnection: RTCPeerConnection =
        callingUser[senderUserId].peerConnection;
      await handleRemoteOffer(senderUserId, offer, peerConnection);
    });

    return () => {
      socket.removeListener('newOffer');
      socket.removeListener('newbieEntered');
      socket.removeListener('remoteAnswer');
    };
  }, [user, callingList]);

  const handleRemoteAnswer = async (answer: any, newbieId: string) => {
    const remoteAnswer = new RTCSessionDescription(answer);

    await callingUser[newbieId].peerConnection.setRemoteDescription(
      remoteAnswer
    );
  };

  const handleRemoteOffer = async (
    senderUserId: string,
    offer: RTCSessionDescriptionInit,
    peerConnection: RTCPeerConnection
  ) => {
    await getLocalVideo(peerConnection);
    const remoteOffer = new RTCSessionDescription(offer);
    await peerConnection.setRemoteDescription(remoteOffer);
    const answer = await peerConnection.createAnswer(remoteOffer);
    await peerConnection.setLocalDescription(answer);

    socket.emit('newAnswer', { answer, senderUserId });
  };

  const createNewOffer = async (
    peerConnection: RTCPeerConnection,
    newbieId: string
  ) => {
    await getLocalVideo(callingUser[newbieId].peerConnection);
    const offer = await callingUser[newbieId].peerConnection.createOffer();
    await callingUser[newbieId].peerConnection.setLocalDescription(offer);
    socket.emit('newOffer', { offer, senderUserId: user.id, newbieId });

    return peerConnection;
  };

  const getLocalVideo = async (peerConnection: RTCPeerConnection) => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = localStream;
    const localTracks = localStream.getTracks();
    localTracks.forEach(localTrack => {
      peerConnection.addTrack(localTrack, localStream);
    });
  };

  useEffect(() => {
    if (!localVideoRef.current) return;

    localVideoRef.current.onloadedmetadata = () => {
      const current = localVideoRef.current as HTMLVideoElement;
      current.play();
    };
  }, []);

  const handleDisconnect = () => {
    callingUserList.forEach(({ peerConnection }) => peerConnection.close());

    setCallingList({
      id: '',
      list: {},
    });

    socket.emit('callLeaved');
    setConnectVideo(false);
  };

  useEffect(() => {
    if (!callingUserList.length) setConnectVideo(false);
  }, [callingUserList]);

  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <>
      <div css={style.videoStyle(connectVideo)}>
        <div css={style.videoBox}>
          <video ref={localVideoRef} muted poster={run} />
          <div css={style.videoController}>
            <span>{user.nickname}</span>
            <div css={style.controllerBox}>
              <button
                type="button"
                onClick={() =>
                  setWebRTC(webRTC => ({ ...webRTC, cam: !webRTC.cam }))
                }>
                {webRTC.cam ? (
                  <div css={style.controllerBtn(camOn)}></div>
                ) : (
                  <div css={style.controllerBtn(camOff)}></div>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  setWebRTC(webRTC => ({ ...webRTC, mic: !webRTC.mic }))
                }>
                {webRTC.mic ? (
                  <div css={style.controllerBtn(micOn)}></div>
                ) : (
                  <div css={style.controllerBtn(micOff)}></div>
                )}
              </button>
            </div>
          </div>
        </div>
        {callingUserList.map((user: callingItemType) => (
          <RemoteVideo
            key={user.id}
            user={user}
            localVideoRef={localVideoRef}
          />
        ))}
      </div>
      <button
        css={style.rejectBtn(connectVideo)}
        onClick={handleDisconnect}></button>
    </>
  );
};

export default React.memo(Video);
