import { useEffect, useState } from 'react';
import {
  modal,
  header,
  title,
  contentWrapper,
  filterBtn,
  filterBtnBox,
} from './sleepyboard.styled';
import Content from './content';
import like from '../../assets/icon/like.svg';
import user from '../../assets/icon/user.svg';

import { boardData } from './boardData';
import axios from 'axios';

const SleepyBoardContainer = ({ animation }: { animation: string }) => {
  const [board, setBoard] = useState<any>([]);

  useEffect(() => {
    // API 요청

    setBoard(boardData);
  }, []);

  const handleFilter = (key: string) => {
    // API 요청

    setBoard(boardData);
  };

  return (
    <section css={modal(animation)}>
      <header css={header}>
        <h2 css={title}>SleepyBoard</h2>
        <div css={filterBtnBox}>
          <button
            type="button"
            onClick={() => handleFilter('like')}
            css={filterBtn(like, 22, 18)}></button>
          <button
            type="button"
            onClick={() => handleFilter('my')}
            css={filterBtn(user, 20, 20)}></button>
        </div>
      </header>
      <ul css={contentWrapper}>
        {board.map((data: any) => (
          <Content key={data.id} data={data} />
        ))}
      </ul>
    </section>
  );
};
export default SleepyBoardContainer;
