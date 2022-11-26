import { css } from '@emotion/react';
import { flexCenter } from '../../styles/mixin.styled';
import theme from '../../styles/theme';
import run from '../../assets/run.gif';

export const wrapper = (isClose: boolean) => css`
  ${flexCenter}

  position:absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #000000;
  width: 100vw;
  height: 100vh;
  ${isClose ? 'animation: close 0.8s ease-in-out;' : ''}

  @keyframes close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const loading = css`
  color: ${theme.white};
  font-weight: 700;
  text-align: center;

  ::before {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    background-image: url(${run});
  }
`;
