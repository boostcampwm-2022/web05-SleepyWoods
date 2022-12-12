import { useEffect, useState } from 'react';
import * as style from './sleepyboard.styled';
import Content from './content';
import like from '../../assets/icon/like.svg';
import user from '../../assets/icon/user.svg';
import axios from 'axios';
import { boardType } from '../../types/types';

const SleepyBoardContainer = () => {
  const [filter, setFilter] = useState('all');
  const [board, setBoard] = useState<boardType[]>([]);

  useEffect(() => {
    getPost(filter);
  }, [filter]);

  const getPost = async (key: string) => {
    try {
      const { data, status } = await axios(`/api/board/${key}`);

      if (status === 200) setBoard(data);
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
          onClick={() => setFilter('like')}
          css={style.filterBtn(filter === 'like', like)}></button>
        <button
          type="button"
          onClick={() => setFilter('me')}
          css={style.filterBtn(filter === 'me', user)}></button>
      </nav>
      <ul css={style.contentWrapper}>
        {board.map(data => (
          <Content key={data.id} data={data} />
        ))}
      </ul>
    </>
  );
};
export default SleepyBoardContainer;
