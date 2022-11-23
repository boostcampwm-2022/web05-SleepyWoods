import { useState } from 'react';
import { modal, header, sleepyBoardBtn } from './sleepyboard.styled';

const SleepyBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <>
      {isShowModal && (
        <section css={modal}>
          <header>
            <h2 css={header}>SleepyBoard</h2>
          </header>
        </section>
      )}
      <button
        type="button"
        onClick={() => setIsShowModal(!isShowModal)}
        css={sleepyBoardBtn}></button>
    </>
  );
};

export default SleepyBoard;
