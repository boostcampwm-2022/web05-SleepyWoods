import { childrenType } from '../../../types/types';
import { container } from './content.styled';

const Content = ({ children }: childrenType) => {
  return <li css={container}>{children}</li>;
};
export default Content;
