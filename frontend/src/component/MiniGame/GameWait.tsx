import { useEffect, useState } from 'react';
import { emitter } from '../Game/util';
import * as style from './miniGame.styled';

const GameWait = ({
  selectModeFriend,
  initGame,
  gameName,
}: {
  selectModeFriend: boolean;
  initGame: Function;
  gameName: string;
}) => {
  const [waitUser, setWaitUser] = useState<{ nickname: string; id: string }[]>(
    []
  );
  useEffect(() => {
    // 대기하는 유저 받아오기

    setWaitUser([
      {
        nickname: 'jongbin',
        id: '120',
      },
      {
        nickname: 'ktmihs',
        id: '111',
      },
    ]);
  }, []);

  const gameStart = () => {
    console.log(waitUser);
    console.log('gameStart!');

    emitter.emit('gameStart', { gameName, userList: waitUser });

    // game으로 emit scene 전환 이후 게임 시작
  };

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
        <button type="button" css={style.backBtn} onClick={() => initGame()}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default GameWait;
