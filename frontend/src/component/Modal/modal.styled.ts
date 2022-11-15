import { css } from '@emotion/react';
import theme from '../../theme';

export const container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 400px;
  height: 60%;
  min-height: 300px;
  background: ${theme.white};
  border-radius: 20px;
`;
