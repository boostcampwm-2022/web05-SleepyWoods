import { css } from '@emotion/react';
import { center } from '../../styles/mixin.styled';
import theme from '../../styles/theme';

export const container = css`
  ${center}

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
  width: 50%;
  min-width: 400px;
  height: 60%;
  min-height: 300px;
  padding: 40px;
  background: ${theme.white};
  border-radius: 20px;
`;
