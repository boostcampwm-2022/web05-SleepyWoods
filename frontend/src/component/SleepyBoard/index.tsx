import { useEffect, useState } from 'react';
import { sleepyBoardBtn } from './sleepyboard.styled';
import SleepyBoardContainer from './SleepyBoardContainer';

const SleepyBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [animation, setAnimation] = useState('show');

  const handleModal = () => {
    if (isShowModal) {
      setAnimation('close');
      setTimeout(() => setIsShowModal(false), 300);
    } else {
      setAnimation('show');
      setIsShowModal(true);
    }
  };

  return (
    <>
      {isShowModal && <SleepyBoardContainer animation={animation} />}
      <button type="button" onClick={handleModal} css={sleepyBoardBtn}></button>
    </>
  );
};

export default SleepyBoard;
