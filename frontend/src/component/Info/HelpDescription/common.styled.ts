import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const infoContainer = css`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;

  background-color: ${theme.white05};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  strong {
    color: ${theme.deepGreen};
    font-weight: 700;
  }

  span {
    color: ${theme.red};
    font-weight: 700;
  }
`;

export const header = css`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 15px;
`;
