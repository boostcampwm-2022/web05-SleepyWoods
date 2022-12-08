import { css } from '@emotion/react';

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const backgroundImage = (url: string) => css`
  background-image: url(${url});
  background-position: center;
  background-repeat: no-repeat;
`;

export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
