import { useState } from 'react';
import {
  modal,
  header,
  title,
  sleepyBoardBtn,
  contentWrapper,
} from './sleepyboard.styled';
import Content from './content';

import { boardData } from './boardData';

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
          <header css={header}>
            <h2 css={title}>SleepyBoard</h2>
          </header>
          <ul css={contentWrapper}>
            {boardData.map((data: any) => (
              <Content key={data.id} data={data} />
            ))}
          </ul>
        </section>
      )}
      <button type="button" onClick={handleModal} css={sleepyBoardBtn}></button>
    </>
  );
};

export default SleepyBoard;
