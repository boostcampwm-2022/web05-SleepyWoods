import { css } from '@emotion/react';

export const container = (
  draggable: boolean,
  isexpand: boolean,
  isCursor: boolean
) => css`
  width: 100%;
  ${isexpand && 'height: 100%;'}
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 15px;
  ${draggable && 'cursor: move;'}
  cursor: ${isCursor ? 'pointer' : 'auto'};
`;
