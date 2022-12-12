import { useRef,useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { VideoStyle } from './call.styled';


// https://github.com/jasonkang14/webrtc-web-client/blob/main/src/App.js
// 저는 이만... 안녕히계세용...

  
const Video = () => {
const socket = useRecoilValue(socketState);
const localVideoRef = useRef<HTMLVideoElement>(null);
const videoRef2 = useRef<HTMLVideoElement>(null);
const videoRef3 = useRef<HTMLVideoElement>(null);

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ]
  }
const pcRef = useRef(new RTCPeerConnection(configuration));
  
  
const creatNewOffer = async () => {
    await getLocalVideo()
    const newOffer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(newOffer);
    return newOffer;
}
const getLocalVideo = async () => {

    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    
    if(!localVideoRef.current) return;
    localVideoRef.current.srcObject = localStream;
    const localTracks = localStream.getTracks();
    localTracks.forEach((localTrack) => {
        console.log(localTrack)
        pcRef.current.addTrack(localTrack, localStream);
    })
  }

  getLocalVideo()

  useEffect(() => {
    if(!localVideoRef.current) return;

    localVideoRef.current.onloadedmetadata = () => {
      const current = localVideoRef.current as HTMLVideoElement;
      current.play();
    }
  }, [])

  useEffect(()=>{
    socket.on("callCreated", ()=>{
        console.log("ggg")
    })
    
  },[])
  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <div css={VideoStyle}>
      <video ref={localVideoRef} />
      <video ref={videoRef2} />
      <video ref={videoRef3} />
    </div>
  );
};

export default Video;
