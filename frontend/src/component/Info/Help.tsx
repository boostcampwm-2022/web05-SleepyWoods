import { useState } from 'react';
import help from '../../assets/icon/help.svg';
import keyboardArrow from '../../assets/icon/keyboardArrow.svg';
import keyboardSpace from '../../assets/icon/keyboardSpace.svg';
import keyboardShift from '../../assets/icon/keyboardShift.svg';
import keyboardA from '../../assets/icon/keyboardA.svg';
import keyboardR from '../../assets/icon/keyboardR.svg';
import * as style from './info.styled';

const Help = () => {
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
            <h3 css={style.header}>📋 Notice</h3>
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
