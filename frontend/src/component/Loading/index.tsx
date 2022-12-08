import { wrapper, loading } from './loading.styled';

const Loading = ({ isClose }: { isClose: boolean }) => {
  return (
    <section css={wrapper(isClose)}>
      <div css={loading}>Loading...</div>
    </section>
  );
};
export default Loading;
