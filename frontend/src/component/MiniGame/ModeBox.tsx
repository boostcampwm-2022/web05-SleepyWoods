import * as style from './miniGame.styled';

const ModeBox = ({
  setSelectModeFriend,
  setIsReady,
}: {
  setIsReady: Function;
  setSelectModeFriend: Function;
}) => {
  const selectFriend = () => {
    setSelectModeFriend(true);
  };

  const joinRoom = () => {
    console.log('랜덤 방 입장!');
    setIsReady(true);
  };
  return (
    <>
      <button css={style.ModeBtn} type="button" onClick={joinRoom}>
        랜덤 유저랑 게임하기
      </button>
      <button css={style.ModeBtn} type="button" onClick={selectFriend}>
        친구랑 게임하기
      </button>
    </>
  );
};

export default ModeBox;
