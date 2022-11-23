import { css } from '@emotion/react';
import { flexCenter } from '../../../styles/mixin.styled';
import theme from '../../../styles/theme';

export const chatContainer = css`
  height: 100%;
`;

export const chatWrapper = css`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;

export const chatItemWrapper = css`
  position: relative;
  padding-left: 10px;
  width: 100%;
  height: 100%;
`;

export const chatInfo = (isCheckedLastMessage: boolean) => css`
  ${flexCenter};

  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;

  .user {
    font-size: 14px;
  }

  .timestamp {
    font-size: 10px;
  }

  ::before {
    content: '';
    display: ${isCheckedLastMessage ? 'inline-block' : 'none'};
    position: absolute;
    left: -5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${theme.yellow};
  }
`;
export const message = css`
  font-size: 12px;
`;
