import { childrenType } from '../../../types/types';
import { container } from './content.styled';

interface contentType extends childrenType {
  draggable?: boolean;
  isexpand?: boolean;
}

const Content = ({
  children,
  draggable = false,
  isexpand = false,
}: contentType) => {
  return (
    <li css={container(draggable, isexpand)} draggable={draggable}>
      {children}
    </li>
  );
};
export default Content;
