import { css } from '@emotion/react';
import { center } from '../../styles/mixin.styled';

export const container = css`
  ${center}

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const title = css`
  font-size: 36px;
  font-weight: 700;
`;

export const content = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

export const imgWrapper = css`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;

  img {
    ${center}
    transform: translate(-50%,-50%) scale(5);
  }
`;
