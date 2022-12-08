import { css } from '@emotion/react';
import { flexCenter } from '../../../styles/mixin.styled';
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

export const input = css`
  width: 100%;
  min-height: 30px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const infoMessage = css`
  ${flexCenter}

  padding: 10px 0px;
  font-size: 12px;
`;

export const errorMessage = css`
  font-size: 12px;
  margin-bottom: 10px;
  color: ${theme.red};
`;

export const logoutBtn = css`
  ${flexCenter}

  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.red};
  font-size: 12px;
`;
