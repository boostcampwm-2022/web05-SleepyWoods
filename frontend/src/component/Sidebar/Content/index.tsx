import { childrenType } from '../../../types/types';
import { container } from './content.styled';

interface contentType extends childrenType {
  draggable?: boolean;
  isexpand?: boolean;
  id?: string;
  nickname?: string;
  isCursor?: boolean;
}

const Content = ({
  children,
  draggable = false,
  isexpand = false,
  id,
  nickname,
  isCursor = false,
}: contentType) => {
  return (
    <li
      css={container(draggable, isexpand, isCursor)}
      draggable={draggable}
      data-id={id}
      data-nickname={nickname}>
      {children}
    </li>
  );
};
export default Content;
