import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const infoContainer = css`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;

  background-color: ${theme.white05};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const header = css`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 15px;
`;
