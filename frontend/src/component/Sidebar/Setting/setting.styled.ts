import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const backgroundSettingWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

export const toggleWrapper = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 700;
  }

  > div {
    cursor: pointer;
  }
`;

export const toggleSwitch = (status: boolean) => css`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${status ? theme.green : theme.gray};

  font-size: 13px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  color: ${theme.white};

  transform: translateX(${status ? 'none' : '30px'});
  transition: all 100ms ease-in-out;
`;

export const toggleBody = css`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.7);
`;
