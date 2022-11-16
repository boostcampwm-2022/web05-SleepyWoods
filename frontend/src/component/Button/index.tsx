import axios from 'axios';
import { MouseEventHandler } from 'react';
import { button, signButton, signupButton, arrowButton } from './button.styled';

type mainButtonType = {
  children: JSX.Element | string;
  type: string;
};

type signupButtonType = {
  children: JSX.Element | string;
  event: MouseEventHandler;
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

// export const SignButton = ({ type }: { type: string }) => {
//   const handleClickEvent = async () => {
//     await axios({
//       method: 'GET',
//       url: `http://localhost:3333/user/login?social=${type}`,
//       withCredentials: true,
//     });
//   };

//   return (
//     <button type="button" css={signButton(type)} onClick={handleClickEvent}>
//       {type}로 로그인하기
//     </button>
//   );
// };

export const SignButton = ({ type }: { type: string }) => {
  const oauth = `http://localhost:3333/user/login?social=${type}`;

  return (
    <a href={oauth}>
      <button type="button" css={signButton(type)}>
        {type}로 로그인하기
      </button>
    </a>
  );
};

export const SignupButton = ({ children, event }: signupButtonType) => {
  return (
    <button type="button" css={signupButton} onClick={event}>
      {children}
    </button>
  );
};

export const ArrowButton = ({ type, event }: arrowButtonType) => {
  return (
    <button type="button" css={arrowButton(type)} onClick={event}></button>
  );
};
