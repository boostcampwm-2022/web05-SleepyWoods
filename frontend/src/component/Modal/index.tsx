import { childrenType } from '../../types/types';
import { container } from './modal.styled';

const Modal = ({ children }: childrenType) => {
  return <section css={container}>{children}</section>;
};

export default Modal;
