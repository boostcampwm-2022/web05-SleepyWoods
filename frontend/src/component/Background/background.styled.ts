import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const header = css`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  text-align: right;
`;

export const teamBtn = css`
  padding: 10px 15px;
  background-color: ${theme.white};
  border-radius: 20px;
  font-weight: 700;
  z-index: 1000;
`;

export const main = css`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const video = css`
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
