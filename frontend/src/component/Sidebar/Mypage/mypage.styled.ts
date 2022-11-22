import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const mypageWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

export const header = css`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 20px;
`;

export const nickname = css`
  width: 100%;
  min-height: 30px;
  border: 1px solid ${theme.gray};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
