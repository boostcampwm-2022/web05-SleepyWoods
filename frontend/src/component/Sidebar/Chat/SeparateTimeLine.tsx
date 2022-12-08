import * as style from './chat.styled';

const SeparateTimeLine = ({ date }: { date: string }) => {
  return (
    <li css={style.separateDate}>
      <div css={style.newDate}>{date}</div>
    </li>
  );
};
export default SeparateTimeLine;
