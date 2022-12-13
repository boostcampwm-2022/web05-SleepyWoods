import { useRef,useEffect } from 'react';
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
            urls: 'stun:stun.l.google.com:19302',
        },
    ]
  }
const pcRef = useRef(new RTCPeerConnection(configuration));
  
  
const creatNewOffer = async () => {
    await getLocalVideo()
    const newOffer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(newOffer);
    socket.emit("newOffer", {offer : newOffer})
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

//   getLocalVideo()

    const handleRemoteOffer = async (userId : string, userOffer : any) =>{
        await getLocalVideo();
        const remoteOffer = new RTCSessionDescription(userOffer)
        await pcRef.current.setRemoteDescription(remoteOffer);
        const newAnswer = await pcRef.current.createAnswer(remoteOffer);
        await pcRef.current.setLocalDescription(newAnswer);
        console.log("앤서예요")
        console.log(newAnswer)
        socket.emit("newAnswer", {answer: newAnswer, userId})

    }

    const handleRemoteAnswer = async (answer: any) => {
        const remoteAnswer = new RTCSessionDescription(answer);
        console.log("리모트 앤서")
        console.log(remoteAnswer)
        await pcRef.current.setRemoteDescription(remoteAnswer)
    }

  useEffect(() => {
    if(!localVideoRef.current) return;

    localVideoRef.current.onloadedmetadata = () => {
      const current = localVideoRef.current as HTMLVideoElement;
      current.play();
    }
  }, [])

  useEffect(() => {
    if(!remoteVideoRef.current) return;

    remoteVideoRef.current.onloadedmetadata = () => {
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.play();
    }
  }, [])

  useEffect(()=>{
    socket.on("remoteOffer", (payload)=>{
        const { offers} = payload;
        offers.forEach(([userId, userOffer]:any)=>{
            handleRemoteOffer(userId, userOffer)
        })
        console.log(offers)

        creatNewOffer()
    })
    

    socket.on("remoteAnswer", (payload)=>{
        const { answer} = payload;
        handleRemoteAnswer(answer)

    })


    socket.on('remoteIce', ({iceCandidates}) => {
      iceCandidates.forEach((iceCandidate:any) => {
        pcRef.current.addIceCandidate(iceCandidate)
      })
    })
    

  },[])
  

  useEffect(() => {
    pcRef.current.addEventListener("signalingstatechange", () => {
      if (pcRef.current.signalingState === 'stable' && pcRef.current.iceGatheringState === 'complete') {
        socket.emit('newIce', {iceCandidates: iceCandidateRef.current})
      }
    })

    pcRef.current.addEventListener("icegatheringstatechange", () => {
      if (pcRef.current.signalingState === 'stable' && pcRef.current.iceGatheringState === 'complete') {
        socket.emit('newIce', {iceCandidates: iceCandidateRef.current})
      }
    })

    pcRef.current.addEventListener("icecandidate", (event) => {
        iceCandidateRef.current = [...iceCandidateRef.current, event.candidate]
      })

    pcRef.current.addEventListener("track", (event) => {
      const [remoteStream] = event.streams;
      const current = remoteVideoRef.current as HTMLVideoElement;
      current.srcObject = remoteStream;
    })
  }, [])


  // 연결 수락이나 끊기 눌렀을 때, 통화 창 안 보이도록 해주기
  return (
    <div css={VideoStyle}>
      <video />
      <video />

      <video ref={localVideoRef} />
      <video ref={remoteVideoRef} />
    </div>
  );
};

export default Video;
