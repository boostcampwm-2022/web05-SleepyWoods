import { useEffect, useState } from 'react';
import * as style from './sleepyboard.styled';
import Content from './content';
import like from '../../assets/icon/like.svg';
import user from '../../assets/icon/user.svg';
import axios from 'axios';

const SleepyBoardContainer = () => {
  const [board, setBoard] = useState<any>([]);

  useEffect(() => {
    getPost('all');
  }, []);

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
          onClick={() => getPost('all')}
          css={style.filterBtn('', 0, 0)}>
          All
        </button>
        <button
          type="button"
          onClick={() => getPost('like')}
          css={style.filterBtn(like, 22, 18)}></button>
        <button
          type="button"
          onClick={() => getPost('my')}
          css={style.filterBtn(user, 20, 20)}></button>
      </nav>
      <ul css={style.contentWrapper}>
        {board.map((data: any) => (
          <Content key={data.id} data={data} />
        ))}
      </ul>
    </>
  );
};
export default SleepyBoardContainer;
