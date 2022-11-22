import { childrenType } from '../../../types/types';
import { container } from './content.styled';

interface contentType extends childrenType {
  draggable?: boolean;
}

const Content = ({ children, draggable = false }: contentType) => {
  return (
    <li css={container} draggable={draggable}>
      {children}
    </li>
  );
};
export default Content;
