import { ChangeEvent, useEffect, useState } from 'react';
import * as style from './miniGame.styled';
import { v1 } from 'uuid';
import { emitter } from '../Game/util';

const MiniGame = () => {
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

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectGame, setSelectGame] = useState('');
  const [selectModeFriend, setSelectModeFriend] = useState(false);
  const [inputRoom, setInputRoom] = useState('');
  const [roomId, setRoomId] = useState('');

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

  const initValue = () => {
    setInputRoom('');
    setRoomId('');
    setSelectModeFriend(false);
  };

  const selectFriend = () => {
    setSelectModeFriend(true);
  };

  const joinRoom = () => {
    console.log('랜덤 방 입장!');
  };

  const createRoom = () => {
    const id = v1();
    setRoomId(id);

    console.log('방생성!', id);
  };

  const enterRoom = () => {
    if (!inputRoom) alert('방 id를 확인해주세요');

    console.log('방 아이디: ', inputRoom);
    console.log('친구방 입장!');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputRoom(e.target.value);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
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
                    <p css={style.enterCode}>{roomId}</p>
                    <div css={style.enterCodeInfo}>
                      <p>친구에게 위 입장코드를 전해주세요!</p>
                      <p>현재 화면에서 기다려주세요!</p>
                    </div>
                    <button css={style.copyBtn} onClick={copyRoomId}>
                      복사하기
                    </button>
                  </>
                ) : !selectModeFriend ? (
                  <>
                    <button
                      css={style.ModeBtn}
                      type="button"
                      onClick={joinRoom}>
                      랜덤 유저랑 게임하기
                    </button>
                    <button
                      css={style.ModeBtn}
                      type="button"
                      onClick={selectFriend}>
                      친구랑 게임하기
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      css={style.ModeBtn}
                      type="button"
                      onClick={createRoom}>
                      방만들기
                    </button>
                    <div css={style.friendMode}>
                      <input
                        type="text"
                        css={style.roomInput}
                        value={inputRoom}
                        onChange={handleChange}
                      />
                      <button
                        css={style.enterBtn}
                        type="button"
                        onClick={enterRoom}>
                        입장
                      </button>
                    </div>
                  </>
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
