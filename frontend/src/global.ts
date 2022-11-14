import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const global = css`
  @import url(https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css);
  ${emotionReset}

  *,
  body {
    font-family: 'NanumSquareRound';
  }

  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
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
