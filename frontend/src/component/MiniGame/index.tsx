import { useEffect, useState } from 'react';
import * as style from './miniGame.styled';
import { emitter } from '../Game/util';
import FriendMode from './FriendMode';
import ModeBox from './ModeBox';
import GameCode from './GameCode';
import GameWait from './GameWait';

const games: { [key: string]: string } = {
  zombie: '술래를 피해 끝까지 살아남으세요!',
  sprint: '장애물을 피해서 결승점에 먼저 도달해보세요!',
  maze: '보이지 않는 길을 찾아 모래사장에 도달하세요!',
};

const gamesName: { [key: string]: string } = {
  zombie: '살아남기',
  sprint: '달리기경주',
  maze: '미로탈출',
};

const MiniGame = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectGame, setSelectGame] = useState('');
  const [selectModeFriend, setSelectModeFriend] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    emitter.on('game', ({ gameName }: { gameName: string }) => {
      setIsShowModal(true);
      setSelectGame(gameName);
    });

    return () => {
      emitter.removeListener('game');
    };
  }, []);

  const handleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const initGame = () => {
    setIsReady(false);
    setRoomId('');
    setSelectModeFriend(false);
  };

  return (
    <>
      {isShowModal && (
        <>
          <section css={style.modal('show')}>
            <button
              type="button"
              css={style.closeBtn}
              onClick={handleModal}></button>
            <h3 css={style.header}>🎮 {gamesName[selectGame]}</h3>
            <div css={style.game}>
              <div css={style.gameInfo}>{games[selectGame]}</div>
              <div css={style.selectModes}>
                {roomId ? (
                  <>
                    <GameCode roomId={roomId} />
                    <GameWait
                      selectModeFriend={selectModeFriend}
                      initGame={initGame}
                    />
                  </>
                ) : isReady ? (
                  <GameWait
                    selectModeFriend={selectModeFriend}
                    initGame={initGame}
                  />
                ) : !selectModeFriend ? (
                  <ModeBox
                    setSelectModeFriend={setSelectModeFriend}
                    setIsReady={setIsReady}
                  />
                ) : (
                  <FriendMode
                    setRoomId={setRoomId}
                    setIsReady={setIsReady}
                    initGame={initGame}
                  />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MiniGame;
