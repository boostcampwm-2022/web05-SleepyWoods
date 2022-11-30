import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const snow = (idx: number) => css`
  position: absolute;
  /* top: 0; */
  left: ${4 * idx}%;
  width: 7px;
  height: 7px;

  border-radius: 12px;
  background-color: ${theme.white};

  animation: fall 5s ease-in 0s infinite;
  animation-fill-mode: both;
  animation-delay: ${Math.random() * 5}s !important;

  &:nth-of-type(even) {
    width: 10px;
    height: 10px;
    border-radius: 40px;
  }

  @keyframes fall {
    0% {
      top: -10px;
      opacity: 1;
    }
    60% {
      margin-left: 45px;
    }
    100% {
      top: 100%;
      opacity: 0.3;
    }
  }

  @keyframes float {
    0% {
      left: 0.5%;
    }
    50% {
      left: -0.5%;
    }
    100% {
      left: 0.5%;
    }
  }
`;
