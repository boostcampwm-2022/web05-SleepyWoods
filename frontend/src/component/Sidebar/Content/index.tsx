import { childrenType } from '../../../types/types';
import { container } from './content.styled';

interface contentType extends childrenType {
  draggable?: boolean;
  isexpand?: boolean;
  id?: string;
  isCursor?: boolean;
}

const Content = ({
  children,
  draggable = false,
  isexpand = false,
  id,
  isCursor = false,
}: contentType) => {
  return (
    <li
      css={container(draggable, isexpand, isCursor)}
      draggable={draggable}
      data-id={id}>
      {children}
    </li>
  );
};
export default Content;
