import { css } from '@emotion/react';
import theme from '../../theme';

export const button = (type: string) => css`
  width: 300px;
  height: 50px;
  background-color: ${type === 'dark' ? theme.black : theme.white};
  color: ${type === 'dark' ? theme.white : theme.black};
  opacity: 0.9;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
`;
