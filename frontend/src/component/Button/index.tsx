import { button } from './button.styled';

type signButtonType = {
  children: JSX.Element | string;
  type: string;
};

export const SignButton = ({ children, type }: signButtonType) => {
  return <button css={button(type)}>{children}</button>;
};
