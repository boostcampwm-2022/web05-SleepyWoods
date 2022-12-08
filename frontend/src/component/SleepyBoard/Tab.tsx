import * as style from './sleepyboard.styled';

const Tab = ({ selected, setTab }: { selected: string; setTab: Function }) => {
  return (
    <ul css={style.tabWrapper}>
      <li css={style.tab(selected === 'board')}>
        <button
          css={style.tabBtn}
          type="button"
          onClick={() => setTab('board')}>
          SleepyBoard
        </button>
      </li>
      <li css={style.tab(selected === 'rank')}>
        <button css={style.tabBtn} type="button" onClick={() => setTab('rank')}>
          SleepyRank
        </button>
      </li>
    </ul>
  );
};

export default Tab;
