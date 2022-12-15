import { useEffect, useState } from 'react';
import { emitter } from '../Game/util';
import * as style from './miniGame.styled';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
const GameWait = ({
  selectModeFriend,
  initGame,
  gameName,
  roomId
}: {
  selectModeFriend: boolean;
  initGame: Function;
  gameName: string;
  roomId:string;
}) => {
  const socket = useRecoilValue(socketState);
  const [waitUser, setWaitUser] = useState<{ nickname: string; id: string }[]>(
    []
  );
  
  const gameStart = () => {
    console.log('gameStart 버튼 클릭!!');

    socket.emit('readyGame', { gameRoomId:roomId });

    // game으로 emit scene 전환 이후 게임 시작
  };

  const leaveGame = () => {
    initGame();
    socket.emit('leaveGameWatingList', {
      gameRoomId: roomId
    })
  }

  useEffect(() => {
    const gameRoomUserListChanged = (data:any)=>{
      // 대기하는 유저 받아오기
      const {userList} = data;
      // setWaitUser(userList=>userList);
      // id, nickname 
      console.log(userList)
      setWaitUser(()=>userList);
    }

    const gameAlert = ({ status }:{ status: string }) => {
      if (status==='READY_GAME'){
        console.log('READY_GAME');
        emitter.emit('readyGame', { gameName: gameName, roomId:roomId });
      } 
    }
  
  
    socket.on("gameRoomUserListChanged", gameRoomUserListChanged);
    socket.on('gameAlert',gameAlert);
  
    return ()=>{
      socket.removeListener("gameRoomUserListChanged", gameRoomUserListChanged)
      socket.removeListener('gameAlert',gameAlert)
    }
  }, []);

  

  return (
    <div css={style.waitBox}>
      <p css={style.waitInfo}>다른 게임 참가자들을 기다려주세요😀</p>
      <div css={style.waitWrapper}>
        <div css={style.waitHeader}>
          <h4>대기자 명단</h4>
          <span css={style.waitcnt}>{waitUser.length} / 4</span>
        </div>
        <ul css={style.waitUserBox}>
          {waitUser.map(user => (
            <li key={user.id} css={style.waitUser}>
              {user.nickname}{' '}
            </li>
          ))}
        </ul>
      </div>
      <div css={style.gameBtnBox}>
        {selectModeFriend && (
          <button type="button" css={style.startBtn} onClick={gameStart}>
            게임 시작
          </button>
        )}
        <button type="button" css={style.backBtn} onClick={leaveGame}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default GameWait;
