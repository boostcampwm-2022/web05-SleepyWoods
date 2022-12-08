import { css } from '@emotion/react';
import { center } from '../../styles/mixin.styled';

export const container = css`
  ${center}

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 50px;

  width: 50%;
  min-width: 600px;
  height: 50%;
  min-height: 400px;
`;

export const logo = css`
  font-size: 64px;
  font-weight: 700;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.4));
  margin-bottom: 50px;
`;
