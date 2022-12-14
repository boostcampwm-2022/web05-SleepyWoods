import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { callingItemType } from '../../store/atom/callingList';
// 나 - 형진 <-종빈
// 1. 새로 들어오면 서버에서 offer를 갔다달라고 해요
// 2. 각자 peerConnection 를 만들어서 offer도 만들어서 서버에 offer 전달
// 3. 서버가 새로 들어온 사람에게 offer 를 주겠죠
// 4. 새로 들어온 사람이 각 offer마다 peerConnection를 생성해서, remoteOffer 처리하고 answer들을 만듭니다.
// 5. 서버가 answer들을 원래 있던 사람들한테 전달하고
// 6. 각자들은 answer를 본인의 setRemote에 심는다.

// 끊을 때
// 나 - 형진 -x 종빈
// 1. 종빈이형은 스스로 peerConnection나 관련 그걸 다 지워요 ->close()
// 2. 우리한테 나간다고 event를 쏴주겠져 (callLeaved)
// 3. 종빈이형을 가리키고 있던 pcref를 지우면 되나요.

type remoteVideoType = {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  user: callingItemType;
};

const RemoteVideo = ({ localVideoRef, user }: remoteVideoType) => {
  const socket = useRecoilValue(socketState);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const iceCandidateRef = useRef<any>([]);

  const { id: userId, peerConnection } = user;

  useEffect(() => {
    if (!remoteVideoRef.current) return;

    remoteVideoRef.current.onloadedmetadata = () => {
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.play();
    };
  }, [remoteVideoRef]);

  useEffect(() => {
    socket.on('remoteIce', ({ iceCandidates }) => {
      if (!peerConnection.remoteDescription) {
        return;
      }
      iceCandidates.forEach((iceCandidate: any) => {
        peerConnection.addIceCandidate(iceCandidate);
      });
    });
    return () => {
      socket.removeListener('remoteIce');
    };
  }, [peerConnection]);

  useEffect(() => {
    peerConnection.addEventListener('signalingstatechange', () => {
      // if (
      //   peerConnection.signalingState === 'stable' &&
      //   peerConnection.iceGatheringState === 'complete'
      // ) {
      // }
      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    peerConnection.addEventListener('icegatheringstatechange', () => {
      //   socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
      // if (
      //   peerConnection.signalingState === 'stable' &&
      //   peerConnection.iceGatheringState === 'complete'
      // ) {
      //   socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
      // }
      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    peerConnection.addEventListener('icecandidate', (event: any) => {
      iceCandidateRef.current = [...iceCandidateRef.current, event.candidate];

      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    peerConnection.addEventListener('track', (event: any) => {
      const [remoteStream] = event.streams;
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.srcObject = remoteStream;
    });
  }, [peerConnection]);

  return <video ref={remoteVideoRef} />;
};

export default RemoteVideo;
