import * as style from './boardAndRankInfo.styled';
import * as commonStyle from './common.styled';
import walkAndUserImg from '../../../assets/info-walkAndUser.png';

const WalkAndUserInfo = () => {
  return (
    <div css={commonStyle.infoContainer}>
      <h4 css={commonStyle.header}>- 걸음수 & 접속유저</h4>
      <div css={style.description}>
        <img
          src={walkAndUserImg}
          alt="걸음수와 접속유저 이미지"
          width={'100%'}
        />
        <p>
          오른쪽 하단에 자신의 <strong> 걸음수</strong>와{' '}
          <strong>접속유저</strong>가 표시됩니다.
        </p>
        <p>방향키로 이동했을때 걸음수가 증가하며 랭킹에 반영됩니다.</p>
      </div>
    </div>
  );
};

export default WalkAndUserInfo;
