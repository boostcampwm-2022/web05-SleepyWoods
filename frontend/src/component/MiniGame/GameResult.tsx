import axios from 'axios';
import { useEffect, useState } from 'react';
import * as style from './miniGame.styled';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atom/user';
import { gamesName } from './index';
import { emitter } from '../Game/util';

const recordFormMaker = (
  winner: string,
  gameType: string,
  gameTime: string,
  OtherPlayer: string[]
) => {
  return `${winner}님이 ${gamesName[gameType]}게임에서 우승했습니다.$
    * 기록 : ${gameTime}$ 
    ${
      OtherPlayer.length
        ? `* 같이한 사람들 : ${OtherPlayer.map(
            (player: any) => player.nickname
          ).join(', ')}`
        : ''
    }`;
};

const GameResult = ({
  setIsGameFinish,
  winnerGame,
}: {
  setIsGameFinish: Function;
  winnerGame: any;
}) => {
  const user = useRecoilValue(userState);
  const [isShared, setShare] = useState(false);

  const { winnerUserData, gameType, gameTime, otherPlayerData } = winnerGame;

  console.log(winnerUserData, gameType, gameTime, otherPlayerData);
  const isWinner = winnerUserData.id === user.id;

  const handleShareResult = () => {
    isShared ||
      (async () => {
        try {
          await axios.post('/api/board', {
            articleData: {
              content: recordFormMaker(
                winnerUserData.nickname,
                gameType,
                gameTime,
                otherPlayerData
              ),
              category: gameType,
            },
          });

          setShare(true);
        } catch (e) {
          console.log(e);
        }
      })();
  };

  const handleExitGame = () => {
    // 게임 나가기
    setIsGameFinish(false);
    emitter.emit('exitGame');
  };

  const commonContent = () => {
    return (
      <div css={style.commonContent}>
        <div>
          <strong>{winnerUserData.nickname}</strong>님이{' '}
          <b>{gamesName[gameType]}</b>
          게임에서 우승했습니다!
        </div>
        <div>
          <div>기록 : </div>
          <p>{gameTime}</p>
        </div>
        <div>
          <div>같이한 사람들 :</div>
          <p>
            {otherPlayerData.map((player: any) => player.nickname).join(', ')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div css={style.selectModes}>
        <div css={style.resultContent}>
          {isWinner ? (
            <>
              <div>우승!</div>
              {commonContent()}
              <div className="buttonsWrapper">
                <button type="button" onClick={handleShareResult}>
                  {isShared ? '공유됨' : '공유하기'}
                </button>
                <button type="button" onClick={handleExitGame}>
                  돌아가기
                </button>
              </div>
            </>
          ) : (
            // 고고
            <>
              <div>아쉬워요😥</div>
              {commonContent()}
              <button type="button" onClick={handleExitGame}>
                돌아가기
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GameResult;
