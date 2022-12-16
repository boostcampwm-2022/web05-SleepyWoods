import { useEffect, useState } from 'react';
import { emitter } from '../Game/util';
import * as style from './miniGame.styled';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
const GameWait = ({
  selectModeFriend,
  initGame,
  gameName,
  roomId,
}: {
  selectModeFriend: boolean;
  initGame: Function;
  gameName: string;
  roomId: string;
}) => {
  const socket = useRecoilValue(socketState);
  const [waitUser, setWaitUser] = useState<{ nickname: string; id: string }[]>(
    []
  );

  const gameStart = () => {
    socket.emit('readyGame', { gameRoomId: roomId });
  };

  // waitingRoom_게임명
  const leaveGame = () => {
    initGame();

    if (!selectModeFriend) {
      socket.emit('leaveGameWatingList', {
        gameRoomId: `waitingRoom_${gameName}`,
      });
    } else {
      socket.emit('leaveGameWatingList', {
        gameRoomId: roomId,
      });
    }
  };

  useEffect(() => {
    const enterRandomGameRoom = () => {
      socket.emit('enterRandomGameRoom', {
        gameType: gameName,
      });
    };

    const gameRoomUserListChanged = (data: any) => {
      const { userList } = data;
      setWaitUser(() => userList);
    };

    const gameAlert = ({
      status,
      message,
    }: {
      status: string;
      message: string;
    }) => {
      if (status === 'READY_GAME') {
        if (!selectModeFriend) {
          emitter.emit('readyGame', { gameName: gameName, roomId: message });
        } else {
          emitter.emit('readyGame', { gameName: gameName, roomId: roomId });
        }
      }
    };

    socket.on('gameRoomUserListChanged', gameRoomUserListChanged);
    socket.on('gameAlert', gameAlert);

    if (!selectModeFriend) {
      enterRandomGameRoom();
    }
    return () => {
      socket.removeListener('gameRoomUserListChanged', gameRoomUserListChanged);
      socket.removeListener('gameAlert', gameAlert);
    };
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
