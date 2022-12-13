import * as style from './boardAndRankInfo.styled';
import * as commonStyle from './common.styled';
import boardAndRankImg from '../../../assets/info-boardAndRank.png';

const BoardAndRankInfo = () => {
  return (
    <div css={commonStyle.infoContainer}>
      <h4 css={commonStyle.header}>- Board & Rank</h4>
      <div css={style.description}>
        <img src={boardAndRankImg} alt="보드와 순위 이미지" width={'100%'} />
        <p>
          오른쪽 하단의 트로피 모양의 버튼을 클릭하면 SleepyBoard가 보여집니다.
        </p>
        <p>
          상단의 탭을 클릭하여 <strong>업적</strong>을 보거나,{' '}
          <strong>걸음수 랭킹</strong>을 볼 수 있습니다.
        </p>
        <p>
          탭 아래의 필터를 클릭해 모든 유저, 좋아요, 친구, 기간을 설정할 수
          있습니다.
        </p>
        <p>
          걸음수 갱신은 <span>매일 자정</span>에 이루어집니다.
        </p>
      </div>
    </div>
  );
};

export default BoardAndRankInfo;
