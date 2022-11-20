import { snow } from './snow.styled';

const Snow = () => {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <div css={snow(i + 1)} key={i}></div>
      ))}
    </>
  );
};

export default Snow;
