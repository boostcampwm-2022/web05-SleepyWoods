import { useEffect, useState } from 'react';
import * as style from './sleepyboard.styled';

import axios from 'axios';
import { formattingWalk } from './util';

const RankContainer = ({ animation }: { animation: string }) => {
  const [rank, setRank] = useState<any>([]);
  const medals = ['🥇', '🥈', '🥉'];
  useEffect(() => {
    getRank('all');
  }, []);

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
          onClick={() => getRank('all')}
          css={style.filterBtn('', 0, 0)}>
          All
        </button>
        <button
          type="button"
          onClick={() => getRank('friend')}
          css={style.filterBtn('', 0, 0)}>
          Friend
        </button>
      </nav>
      <div css={style.contentWrapper}>
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
