import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const global = css`
  @import url(https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css);
  ${emotionReset}

  *,
  body,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: 'NanumSquareRound', 'nanum';
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  canvas {
    margin: 0 !important;
  }

  .srOnly {
    overflow: hidden;
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
  }

  .hidden {
    display: none !important;
  }

  input:focus,
  select:focus,
  option:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
