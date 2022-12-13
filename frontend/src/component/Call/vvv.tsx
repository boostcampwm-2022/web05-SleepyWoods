import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import {
  callingItemType,
  callingListState,
} from '../../store/atom/callingList';
import { VideoStyle } from './call.styled';
import RemoteVideo from './remoteVideo';
import { configuration } from './config';

// 나 - 형진 <-종빈
// 1. 새로 들어오면 서버에서 offer를 갔다달라고 해요
// 2. 각자 pcREF 를 만들어서 offer도 만들어서 서버에 offer 전달
// 3. 서버가 새로 들어온 사람에게 offer 를 주겠죠
// 4. 새로 들어온 사람이 각 offer마다 pcref를 생성해서, remoteOffer 처리하고 answer들을 만듭니다.
// 5. 서버가 answer들을 원래 있던 사람들한테 전달하고
// 6. 각자들은 answer를 본인의 setRemote에 심는다.

// 끊을 때
// 나 - 형진 -x 종빈
// 1. 종빈이형은 스스로 pcref나 관련 그걸 다 지워요 ->close()
// 2. 우리한테 나간다고 event를 쏴주겠져 (callLeaved)
// 3. 종빈이형을 가리키고 있던 pcref를 지우면 되나요.

const Video = () => {
  const socket = useRecoilValue(socketState);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const iceCandidateRef = useRef<any>([]);

  const callingList = useRecoilValue(callingListState);
  const callingUserList = Object.values(Object.values(callingList)[1]);
  const [userList, setUserList] = useState<any>([]);

  const pcRef = useRef(new RTCPeerConnection(configuration));

  const creatNewOffer = async () => {
    console.log('2. createNewOffer : 내 오퍼를 만들어서 서버에 등록!');
    await getLocalVideo();
    const newOffer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(newOffer);
    console.log(
      '3. createOffer & setLocalDescription : 내 오퍼를 만들어서 setLocalDescription!'
    );
    socket.emit('newOffer', { offer: newOffer });
  };
  const getLocalVideo = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (!localVideoRef.current) return;
    localVideoRef.current.srcObject = localStream;
    const localTracks = localStream.getTracks();
    localTracks.forEach(localTrack => {
      pcRef.current.addTrack(localTrack, localStream);
    });
  };

  const handleRemoteOffer = async (userId: string, userOffer: any) => {
    console.log(
      '2. 서버에서 제공해준 기 참가자들의 offer를 내꺼랑 섞어서 나한테 등록 '
    );
    console.log('userId :', userId);
    console.log('userOffer :', userOffer);
    await getLocalVideo();
    const remoteOffer = new RTCSessionDescription(userOffer);
    await pcRef.current.setRemoteDescription(remoteOffer);
    const newAnswer = await pcRef.current.createAnswer(remoteOffer);
    await pcRef.current.setLocalDescription(newAnswer);
    console.log(`3. ${userId}에게 앤서를 만들어서 돌려보내주고 있어요~`);
    socket.emit('newAnswer', { answer: newAnswer, userId });
  };

  const handleRemoteAnswer = async (answer: any) => {
    const remoteAnswer = new RTCSessionDescription(answer);
    console.log('4. 기존의 유저들은 리모트 앤서를 받고 있어요~~');
    await pcRef.current.setRemoteDescription(remoteAnswer);
  };

  useEffect(() => {
    if (!localVideoRef.current) return;

    localVideoRef.current.onloadedmetadata = () => {
      const current = localVideoRef.current as HTMLVideoElement;
      current.play();
    };
  }, []);

  useEffect(() => {
    if (!remoteVideoRef.current) return;

    remoteVideoRef.current.onloadedmetadata = () => {
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.play();
    };
  }, []);

  useEffect(() => {
    // const socket = useR
    socket.on('remoteOffer', async payload => {
      console.log('1. remoteOffer 시작');
      const { offers } = payload;
      await creatNewOffer();
      offers.forEach(async ([userId, userOffer]: any) => {
        await handleRemoteOffer(userId, userOffer);
      });
    });

    socket.on('remoteAnswer', async payload => {
      const { answer } = payload;
      await handleRemoteAnswer(answer);
    });

    socket.on('remoteIce', ({ iceCandidates }) => {
      if (!pcRef.current.remoteDescription) {
        return;
      }
      iceCandidates.forEach((iceCandidate: any) => {
        pcRef.current.addIceCandidate(iceCandidate);
      });
    });
  }, []);

  useEffect(() => {
    pcRef.current.addEventListener('signalingstatechange', () => {
      console.log('1. signalingstatechange 가 변경 감자되었어요.');
      // if (
      //   pcRef.current.signalingState === 'stable' &&
      //   pcRef.current.iceGatheringState === 'complete'
      // ) {
      //   socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
      // }
      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    pcRef.current.addEventListener('icegatheringstatechange', () => {
      console.log('2. icegatheringstatechange 가 변경 감자되었어요.');
      // if (
      //   pcRef.current.signalingState === 'stable' &&
      //   pcRef.current.iceGatheringState === 'complete'
      // ) {
      //   socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
      // }
      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    pcRef.current.addEventListener('icecandidate', event => {
      console.log('3. icecandidate 가 변경 감지되었어요.');
      iceCandidateRef.current = [...iceCandidateRef.current, event.candidate];

      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    pcRef.current.addEventListener('track', event => {
      console.log('4. track 감지');
      const [remoteStream] = event.streams;
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.srcObject = remoteStream;
    });
  }, []);

  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <div css={VideoStyle}>
      <video ref={localVideoRef} />
      {callingUserList.map((user: callingItemType) => (
        <RemoteVideo key={user.id} user={user} localVideoRef={localVideoRef} />
      ))}
    </div>
  );
};

export default React.memo(Video);
