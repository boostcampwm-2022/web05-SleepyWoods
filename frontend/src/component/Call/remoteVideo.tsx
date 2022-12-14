import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { callingItemType } from '../../store/atom/callingList';

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
      socket.emit('newIce', { iceCandidates: iceCandidateRef.current });
    });

    peerConnection.addEventListener('icegatheringstatechange', () => {
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
