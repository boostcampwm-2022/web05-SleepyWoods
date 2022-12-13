import { useState } from 'react';
import * as style from './miniGame.styled';

const GameCode = ({ roomId }: { roomId: string }) => {
  const [isCopy, setIsCopy] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setIsCopy(true);
  };

  return (
    <>
      <div css={style.enterCodeBox}>
        <p css={style.enterCode}>{roomId}</p>
        <button css={style.copyBtn(isCopy)} onClick={copyRoomId}></button>
      </div>
      <div css={style.enterCodeInfo}>
        <p>친구에게 위 입장코드를 전해주세요!</p>
        <p>현재 화면에서 기다려주세요!</p>
      </div>
    </>
  );
};

export default GameCode;
