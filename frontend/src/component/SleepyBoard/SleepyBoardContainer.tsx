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
import axios from 'axios';

const SleepyBoardContainer = ({ animation }: { animation: string }) => {
  const [board, setBoard] = useState<any>([]);

  useEffect(() => {
    getPost('all');
  }, []);

  const getPost = async (key: string) => {
    // API 요청
    try {
      const { data, status } = await axios(`/api/board/${key}`);
      if (status === 200) setBoard(data);
    } catch (e) {}
  };

  return (
    <section css={modal(animation)}>
      <header css={header}>
        <h2 css={title}>SleepyBoard</h2>
        <div css={filterBtnBox}>
          <button
            type="button"
            onClick={() => getPost('like')}
            css={filterBtn(like, 22, 18)}></button>
          <button
            type="button"
            onClick={() => getPost('my')}
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
