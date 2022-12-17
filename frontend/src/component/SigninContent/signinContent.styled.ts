import { css } from '@emotion/react';
import { center, flexCenter } from '../../styles/mixin.styled';

export const container = css`
  ${center}
  ${flexCenter}
  flex-flow: column nowrap;
  gap: 50px;
  width: 100%;
`;

export const title = css`
  font-size: 36px;
  font-weight: 700;
`;

export const content = css`
  ${flexCenter}
  gap: 50px;
  width: 100%;
`;

export const imgWrapper = css`
  position: relative;
  width: 30%;
  height: 30%;
  min-width: 75px;
  min-height: 150px;
  overflow: hidden;

  img {
    ${center}
    transform: translate(-50%,-50%) scale(5);
  }
`;
