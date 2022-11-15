import { childrenType } from '../../types/types';
import { header, teamBtn, main, video } from './background.styled';

const Background = ({ children }: childrenType) => {
  return (
    <>
      <video css={video} src="src/assets/background.mp4" autoPlay loop muted>
        배경 영상
      </video>
      <header css={header}>
        <button css={teamBtn}>팀 소개</button>
      </header>
      <main css={main}>{children}</main>
    </>
  );
};

export default Background;
