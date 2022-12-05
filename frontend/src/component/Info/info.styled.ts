import { css } from '@emotion/react';
import theme from '../../styles/theme';

export const infoBox = css`
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

export const info = (content: string) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${theme.white};

  padding: 10px 20px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  ::after {
    content: '';
    display: block;
    width: 20px;
    height: 15px;
    margin-left: 5px;
    background-image: url(${content});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
