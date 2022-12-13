import { useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { VideoStyle } from './call.styled';

// https://github.com/jasonkang14/webrtc-web-client/blob/main/src/App.js
// 저는 이만... 안녕히계세용...

const Video = () => {
  const socket = useRecoilValue(socketState);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const iceCandidateRef = useRef<any>([]);

  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };
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
      <video ref={remoteVideoRef} />
    </div>
  );
};

export default Video;
