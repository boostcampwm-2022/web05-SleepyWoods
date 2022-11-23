import { css } from '@emotion/react';

export const container = (isexpand: boolean) => css`
  width: 100%;
  ${isexpand && 'height: 100%;'}
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 15px;
`;
