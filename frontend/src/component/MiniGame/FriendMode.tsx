import { ChangeEvent, useEffect, useState } from 'react';
import * as style from './miniGame.styled';
import { v1 } from 'uuid';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';

const FriendMode = ({
  setRoomId,
  setIsReady,
  initGame,
}: {
  setRoomId: Function;
  setIsReady: Function;
  initGame: Function;
}) => {
  const [inputRoom, setInputRoom] = useState('');
  const socket = useRecoilValue(socketState);

  //
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputRoom(e.target.value);
  };

  const createRoom = () => {
    const id = v1();
    setRoomId(id);
    
    socket.emit('createNewGameRoom',{
      gameRoomId : id
    })
    console.log('방생성!', id);
  };

  const enterRoom = () => {
    if (!inputRoom) {
      alert('방 id를 확인해주세요');
      return;
    }
    socket.emit("joinGameRoom", {
      gameRoomId : inputRoom
    })

    console.log('방 아이디: ', inputRoom);
    console.log('친구방 입장!');
  };
  
  useEffect(()=>{
    const gameAlert = ({status, message}:{status:string, message:any}) => {
        if(status==='ROOM_NOT_EXIST'){
          alert(message);
        }else if (status==='JOIN_ROOM_SUCCESS'){
          setRoomId(message)
        }
    }
    socket.on('gameAlert',gameAlert)
    
    return ()=>{
      socket.removeListener('gameAlert',gameAlert)
    }
  }, []);

  return (
    <>
      <button css={style.ModeBtn} type="button" onClick={createRoom}>
        방만들기
      </button>
      <div css={style.friendMode}>
        <input
          type="text"
          css={style.roomInput}
          value={inputRoom}
          onChange={handleChange}
        />
        <button css={style.enterBtn} type="button" onClick={enterRoom}>
          입장
        </button>
      </div>
      <button type="button" css={style.backBtn} onClick={() => initGame()}>
        돌아가기
      </button>
    </>
  );
};

export default FriendMode;
