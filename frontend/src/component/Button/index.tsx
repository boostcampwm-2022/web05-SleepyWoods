import { button } from './button.styled';

type mainButtonType = {
  children: JSX.Element | string;
  type: string;
};

export const MainButton = ({ children, type }: mainButtonType) => {
  return <button css={button(type)}>{children}</button>;
};
