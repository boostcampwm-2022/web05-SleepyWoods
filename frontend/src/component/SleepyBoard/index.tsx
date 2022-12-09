import { useEffect, useState } from 'react';
import RankContainer from './RankContainer';
import * as style from './sleepyboard.styled';
import SleepyBoardContainer from './SleepyBoardContainer';
import Tab from './Tab';

const SleepyBoard = () => {
  const [tab, setTab] = useState('board');
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
        <>
          <section css={style.modal(animation)}>
            <button
              type="button"
              css={style.closeBtn}
              onClick={handleModal}></button>
            <Tab selected={tab} setTab={setTab} />
            {tab === 'board' ? <SleepyBoardContainer /> : <RankContainer />}
          </section>
        </>
      )}
      <button
        type="button"
        onClick={handleModal}
        css={style.sleepyBoardBtn}></button>
    </>
  );
};

export default SleepyBoard;
