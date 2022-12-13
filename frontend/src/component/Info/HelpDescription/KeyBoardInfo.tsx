import * as style from './keyBoardInfo.styled';
import * as commonStyle from './common.styled';
import keyboardArrow from '../../../assets/icon/keyboardArrow.svg';
import keyboardSpace from '../../../assets/icon/keyboardSpace.svg';
import keyboardShift from '../../../assets/icon/keyboardShift.svg';
import keyboardA from '../../../assets/icon/keyboardA.svg';
import keyboardR from '../../../assets/icon/keyboardR.svg';

const KeyBoardInfo = () => {
  return (
    <div css={commonStyle.infoContainer}>
      <h4 css={commonStyle.header}>- 기본키 조작법</h4>
      <div css={style.description}>
        <ul>
          <li>
            <img src={keyboardArrow} alt="방향키 이미지" height={'80px'} />
            <p>화살표 방향키로 이동할 수 있습니다.</p>
          </li>
          <li>
            <img src={keyboardSpace} alt="space키 이미지" height={'40px'} />
            <p>space키로 점프할 수 있습니다.</p>
          </li>
        </ul>
        <ul>
          <li>
            <img src={keyboardA} alt="A키 이미지" height={'40px'} />
            <p>A키로 공격 모션을 취할 수 있습니다.</p>
          </li>
          <li>
            <img src={keyboardR} alt="R키 이미지" height={'40px'} />
            <p>R키로 구르기를 할 수 있습니다.</p>
          </li>
          <li>
            <img src={keyboardShift} alt="shift키 이미지" height={'40px'} />
            <p>shift키로 달리기를 할 수 있습니다.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KeyBoardInfo;
