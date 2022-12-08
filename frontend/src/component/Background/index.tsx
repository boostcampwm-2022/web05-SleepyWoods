import { childrenType } from '../../types/types';
import { header, teamBtn, main, video } from './background.styled';
import background from '../../assets/background.mp4';

const Background = ({ children }: childrenType) => {
  const notion =
    'https://www.notion.so/boostcamp-wm/Web05-Phaser-Socket-WebRTC-4913d5b6116f4c37be84340703eb8a8d';
  const github = 'https://github.com/boostcampwm-2022/web05-SleepyWoods';

  return (
    <>
      <video css={video} src={background} autoPlay loop muted>
        배경 영상
      </video>
      <header css={header}>
        <a href={github} css={teamBtn} target="_blank">
          Github
        </a>
        <a href={notion} css={teamBtn} target="_blank">
          프로젝트 소개
        </a>
      </header>
      <main css={main}>{children}</main>
    </>
  );
};

export default Background;
