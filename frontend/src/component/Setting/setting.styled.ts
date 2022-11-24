import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { flexCenter } from '../../styles/mixin.styled';

export const header = css`
  font-weight: 700;
  font-size: 36px;
`;

export const nicknameContainer = css`
  ${flexCenter}
  flex-flow: column;

  position: relative;
  width: 100%;
`;

export const nickname = css`
  width: 80%;
  min-height: 50px;
  border: 1px solid ${theme.gray};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
`;

export const errorMessage = css`
  position: absolute;
  top: 60px;
  font-size: 12px;
  color: ${theme.red};
`;
