import { useEffect, useState } from 'react';
import help from '../../assets/icon/help.svg';
import BoardAndRankInfo from './HelpDescription/BoardAndRankInfo';
import KeyBoardInfo from './HelpDescription/KeyBoardInfo';
import SidebarInfo from './HelpDescription/SidebarInfo';
import WalkAndUserInfo from './HelpDescription/WalkAndUserInfo';

import * as style from './info.styled';

const Help = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [animation, setAnimation] = useState('show');
  const [setOpen, isSetOpen] = useState(false);

  const setOpenModal = () => {
    isSetOpen(!setOpen);
  };

  const handleModal = () => {
    if (isShowModal) {
      setAnimation('close');
      setTimeout(() => setIsShowModal(false), 300);

      const setValue = setOpen ? 'open' : 'close';
      localStorage.setItem('openHelp', setValue);
    } else {
      setAnimation('show');
      setIsShowModal(true);
    }
  };

  useEffect(() => {
    const openHelp = localStorage.getItem('openHelp');

    if (openHelp !== 'close') {
      setIsShowModal(true);
      isSetOpen(true);
    }
  }, []);

  return (
    <>
      {isShowModal && (
        <>
          <section css={style.modal(animation)}>
            <button
              type="button"
              css={style.closeBtn}
              onClick={handleModal}></button>
            <h3 css={style.header}>π Notice</h3>
            <div css={style.content}>
              <KeyBoardInfo />
              <SidebarInfo />
              <BoardAndRankInfo />
              <WalkAndUserInfo />
            </div>
            <div css={style.helpSettingWrapper}>
              <p>μ°μΈ‘ νλ¨μ λ¬Όμν λ²νΌμ ν΄λ¦­ν΄μ λμλ§μ λ³Ό μ μμ΅λλ€.</p>
              <div css={style.helpSetting(setOpen)}>
                <p>μ μμ λμλ§ μΌκΈ°</p>
                <button type="button" onClick={setOpenModal}></button>
              </div>
            </div>
          </section>
        </>
      )}
      <button
        type="button"
        onClick={handleModal}
        css={style.info(help)}></button>
    </>
  );
};

export default Help;
