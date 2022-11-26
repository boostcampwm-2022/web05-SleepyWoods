import { useState } from 'react';
import * as style from './sleepyboard.styled';

const Content = ({ data }: { data: any }) => {
  const { user, avatar, timestamp, category, description, like, url } = data;
  const [isLike, setIsLike] = useState(like);

  const handleLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div css={style.content}>
      <img src={url} alt="img" css={style.img} />
      <div css={style.contentInfo}>
        <div css={style.user(avatar)}>
          {user}
          <span css={style.time}>{timestamp}</span>
        </div>
        <h3 css={style.category}>{category}</h3>
        <div css={style.description}>{description}</div>
      </div>
      <button
        type="button"
        onClick={handleLike}
        css={style.likeBtn(isLike)}></button>
    </div>
  );
};

export default Content;
