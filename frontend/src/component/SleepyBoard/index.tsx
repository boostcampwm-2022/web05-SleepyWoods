import { useState } from 'react';
import { modal, header, sleepyBoardBtn } from './sleepyboard.styled';

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
      {isShowModal && (
        <section css={modal(animation)}>
          <header>
            <h2 css={header}>SleepyBoard</h2>
          </header>
        </section>
      )}
      <button type="button" onClick={handleModal} css={sleepyBoardBtn}></button>
    </>
  );
};

export default SleepyBoard;
