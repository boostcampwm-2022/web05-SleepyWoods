import { useEffect, useState } from 'react';
import * as style from './sleepyboard.styled';

import axios from 'axios';
import { formattingWalk } from './util';
import { walkType } from '../../types/types';

const RankContainer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateList = [
    { year: month - 2 > 0 ? year : year - 1, month: month - 2 },
    { year: month - 1 > 0 ? year : year - 1, month: month - 1 },
    { year: year, month: month },
  ];

  const [monthIdx, setMonthIdx] = useState(2);
  const [filter, setFilter] = useState('all');
  const [rank, setRank] = useState<walkType[]>([]);
  const medals = ['🥇', '🥈', '🥉'];

  useEffect(() => {
    const getRank = async () => {
      try {
        const { data, status } = await axios(
          `/api/achievement/walk?year=${dateList[monthIdx].year}&month=${dateList[monthIdx].month}&range=${filter}`
        );

        if (status === 200) setRank(data);
      } catch (e) {}
    };

    getRank();
  }, [filter, monthIdx]);

  return (
    <>
      <nav css={style.filterBtnBox}>
        <button
          type="button"
          onClick={() => setFilter('all')}
          css={style.filterBtn(filter === 'all', '')}>
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('friend')}
          css={style.filterBtn(filter === 'friend', '')}>
          Friend
        </button>
      </nav>

      <div css={style.contentWrapper}>
        <div css={style.selectMonthBox}>
          {dateList.map((date, idx: number) => (
            <button
              key={date.month}
              css={style.selectMonth(monthIdx === idx)}
              onClick={() => setMonthIdx(idx)}>
              {`${date.year}년 ${date.month}월`}
            </button>
          ))}
        </div>
        <ul css={style.topRankContainer}>
          {rank.map((user, idx: number) => {
            if (idx >= 3) return;
            return (
              <li key={idx}>
                <span css={style.nickname(medals[idx])}>{user.nickname}</span>
                <span>{formattingWalk(user.walkcount) + ' 보'}</span>
              </li>
            );
          })}
        </ul>
        <ul css={style.rankContainer}>
          {rank.map((user, idx: number) => {
            if (idx < 3) return;
            return (
              <li key={idx}>
                <span css={style.nickname(idx + 1 + '.')}>{user.nickname}</span>
                <span>{formattingWalk(user.walkcount) + ' 보'}</span>
              </li>
            );
          })}
        </ul>
        <div css={style.infoMsg}>걸음수는 자정에 최신화됩니다!</div>
      </div>
    </>
  );
};

export default RankContainer;
