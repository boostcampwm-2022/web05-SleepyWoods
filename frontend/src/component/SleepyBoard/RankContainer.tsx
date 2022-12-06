import { useEffect, useState } from 'react';
import * as style from './sleepyboard.styled';

import axios from 'axios';
import { formattingWalk } from './util';

const RankContainer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateList = [
    `${month - 2 > 0 ? year : year - 1}년 ${month - 2}월`,
    `${month - 1 > 0 ? year : year - 1}년 ${month - 1}월`,
    `${year}년 ${month}월`,
  ];

  const [monthIdx, setMonthIdx] = useState(2);
  const [filter, setFilter] = useState('all');
  const [rank, setRank] = useState<any>([]);
  const medals = ['🥇', '🥈', '🥉'];

  useEffect(() => {
    getRank(filter);
  }, [filter]);

  const getRank = async (key: string) => {
    try {
      // const { data, status } = API 요청
      const status = 200;
      const data = [
        { nickname: '안현서', walk: 300020 },
        { nickname: '이형진', walk: 300019 },
        { nickname: '강성준', walk: 300018 },
        { nickname: '원종빈', walk: 300017 },
        { nickname: '원종빈', walk: 300016 },
        { nickname: '원종빈', walk: 300015 },
        { nickname: '원종빈', walk: 300014 },
        { nickname: '원종빈', walk: 300013 },
        { nickname: '원종빈', walk: 300012 },
        { nickname: '원종빈', walk: 300011 },
        { nickname: '원종빈', walk: 300010 },
        { nickname: '원종빈', walk: 300009 },
        { nickname: '원종빈', walk: 300008 },
        { nickname: '원종빈', walk: 300007 },
        { nickname: '원종빈', walk: 300006 },
        { nickname: '원종빈', walk: 300005 },
        { nickname: '원종빈', walk: 300004 },
        { nickname: '원종빈', walk: 300003 },
        { nickname: '원종빈', walk: 300002 },
        { nickname: '원종빈', walk: 300001 },
        { nickname: '원종빈', walk: 300000 },
      ];

      if (status === 200) setRank(data);
    } catch (e) {}
  };

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
          {dateList.map((date: string, idx: number) => (
            <button
              css={style.selectMonth(monthIdx === idx)}
              onClick={() => setMonthIdx(idx)}>
              {date}
            </button>
          ))}
        </div>
        <ul css={style.topRankContainer}>
          {rank.map((user: any, idx: number) => {
            if (idx >= 3) return;
            return (
              <li key={idx}>
                <span>
                  {medals[idx]} {user.nickname}
                </span>
                <span>{formattingWalk(user.walk) + ' 보'}</span>
              </li>
            );
          })}
        </ul>
        <ul css={style.rankContainer}>
          {rank.map((user: any, idx: number) => {
            if (idx < 3) return;
            return (
              <li key={idx}>
                <span>
                  {idx + 1 + '.'} {user.nickname}
                </span>
                <span>{formattingWalk(user.walk) + ' 보'}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RankContainer;
