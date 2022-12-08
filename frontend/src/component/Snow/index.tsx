import { snow } from './snow.styled';

const Snow = () => {
  return (
    <>
      {[...Array(25)].map((_, i) => (
        <div css={snow(i + 1)} key={i}></div>
      ))}
    </>
  );
};

export default Snow;
