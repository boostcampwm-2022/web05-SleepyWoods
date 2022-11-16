import { MouseEventHandler } from 'react';
import { button, signButton, signupButton, arrowButton } from './button.styled';

type mainButtonType = {
  children: JSX.Element | string;
  type: string;
};

type signupButtonType = {
  children: JSX.Element | string;
};

type arrowButtonType = {
  type: string;
  event: MouseEventHandler;
};

export const MainButton = ({ children, type }: mainButtonType) => {
  return (
    <button type="button" css={button(type)}>
      {children}
    </button>
  );
};

export const SignButton = ({ children, type }: mainButtonType) => {
  return (
    <button type="button" css={signButton(type)}>
      {children}
    </button>
  );
};

export const SignupButton = ({ children }: signupButtonType) => {
  return (
    <button type="button" css={signupButton}>
      {children}
    </button>
  );
};

export const ArrowButton = ({ type, event }: arrowButtonType) => {
  return (
    <button type="button" css={arrowButton(type)} onClick={event}></button>
  );
};
