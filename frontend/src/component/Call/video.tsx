import React, { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import {
  callingItemType,
  callingListState,
} from '../../store/atom/callingList';
import { VideoStyle } from './call.styled';
import RemoteVideo from './remoteVideo';
import { userState } from '../../store/atom/user';

const Video = ({
  connectVideo,
  setConnectVideo,
}: {
  connectVideo: boolean;
  setConnectVideo: Dispatch<SetStateAction<boolean>>;
}) => {
  const socket = useRecoilValue(socketState);
  const callingList = useRecoilValue(callingListState);
  const callingUser = callingList.list;
  const callingUserList = Object.values(callingList.list);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const user = useRecoilValue(userState);

  // sender useEffect
  useEffect(() => {
    // 새 사람이 들어오면 이는 서버에서 알려주고, 기존 사람들은 이를 감지하여 각자 offer를 생성해 줍시다~~~~
    socket.on('newbieEntered', async payload => {
      console.log('newbie가 들어왔어요~ offer를 보내줄 시간~');
      //RTCPeerConnection: new (configuration?: RTCConfiguration | undefined) => RTCPeerConnection
      const { newbieId }: { newbieId: string } = payload;
      console.log(callingList);
      console.log('@@@newbie@@@', newbieId);
      console.log(callingUser[newbieId]);
      const peerConnection: RTCPeerConnection =
        callingUser[newbieId].peerConnection;

      callingUser[newbieId].peerConnection = await createNewOffer(
        peerConnection,
        newbieId
      );
    });

    socket.on('remoteAnswer', async function (payload) {
      console.log('리모트앤서라고~~');
      const { answer, newbieId } = payload;
      console.log('@@@newbie in remote Answer@@@', newbieId);
      console.log(callingList);
      console.log(
        '************************',
        newbieId,
        callingUser[newbieId].peerConnection
      );
      const peerConnection: RTCPeerConnection =
        callingUser[newbieId].peerConnection;

      // 4
      await handleRemoteAnswer(answer, newbieId);
    });

    socket.on('newOffer', async payload => {
      // 기존 사람들로 부터 offer 들이 왔다....
      console.log('뉴오퍼오퍼오퍼~~ 받아왔어요~~ 내꺼랑 섞지요~~');

      const { offer, senderUserId } = payload;
      console.log('@@@newbie@@@', senderUserId);
      const peerConnection: RTCPeerConnection =
        callingUser[senderUserId].peerConnection;
      await handleRemoteOffer(senderUserId, offer, peerConnection);
    });

    return () => {
      // 원종빈은...지우개....
      // 나는 다 지워.....
      socket.removeListener('newOffer');
      socket.removeListener('newbieEntered');
      socket.removeListener('remoteAnswer');
    };
  }, [user, callingList]);

  // receiver useEffect
  // useEffect(() => {
  // }, [user]);

  const handleRemoteAnswer = async (answer: any, newbieId: string) => {
    const remoteAnswer = new RTCSessionDescription(answer);

    console.log('4. 기존의 유저들은 뉴비로부터 앤서를 받고 있어요~~');
    console.log(callingList);

    console.log('원래 로컬 떠있어줘 제발제발');
    console.log('remoteAns : ', remoteAnswer);
    console.log('peerConnection : ', callingUser[newbieId].peerConnection);
    await callingUser[newbieId].peerConnection.setRemoteDescription(
      remoteAnswer
    );
  };

  const handleRemoteOffer = async (
    senderUserId: string,
    offer: RTCSessionDescriptionInit,
    peerConnection: RTCPeerConnection
  ) => {
    console.log(
      '2. 서버에서 제공해준 기 참가자들의 offer를 내꺼랑 섞어서 나한테 등록 '
    );
    await getLocalVideo(peerConnection);
    const remoteOffer = new RTCSessionDescription(offer);
    await peerConnection.setRemoteDescription(remoteOffer);
    const answer = await peerConnection.createAnswer(remoteOffer);
    await peerConnection.setLocalDescription(answer);
    console.log(
      '=======handleRemoteOffer() => setLocalDescription=====',
      peerConnection
    );

    console.log(`3. ${senderUserId}에게 앤서를 만들어서 돌려보내주고 있어요~`);
    socket.emit('newAnswer', { answer, senderUserId });
  };

  const createNewOffer = async (
    peerConnection: RTCPeerConnection,
    newbieId: string
  ) => {
    console.log('2. createNewOffer : 내 오퍼를 만들어서 서버에 등록!');
    await getLocalVideo(callingUser[newbieId].peerConnection);
    const offer = await callingUser[newbieId].peerConnection.createOffer();
    await callingUser[newbieId].peerConnection.setLocalDescription(offer);
    console.log(
      '=======createNewOffer() => setLocalDescription=====',
      peerConnection
    );
    console.log(callingList);
    console.log(
      '3. createOffer & setLocalDescription : 내 오퍼를 만들어서 setLocalDescription!'
    );
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
    setConnectVideo(() => false);
    // 연결 끊기
  };

  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <div css={VideoStyle(connectVideo)}>
      <video ref={localVideoRef} muted />
      {callingUserList.map((user: callingItemType) => (
        <RemoteVideo key={user.id} user={user} localVideoRef={localVideoRef} />
      ))}
      <button onClick={handleDisconnect}>나가기</button>
    </div>
  );
};

export default React.memo(Video);
