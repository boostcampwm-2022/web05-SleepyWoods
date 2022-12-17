import * as style from './chat.styled';

const SeparateTimeLine = ({ date }: { date: string }) => {
  return (
    <div css={style.separateDate}>
      <div css={style.newDate}>{date}</div>
    </div>
  );
};
export default SeparateTimeLine;
