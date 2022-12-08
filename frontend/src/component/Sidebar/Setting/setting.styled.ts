import { css } from '@emotion/react';
import { ellipsis } from '../../../styles/mixin.styled';
import theme from '../../../styles/theme';
import dropdown from '../../../assets/icon/dropdownIcon.svg';

export const settingWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;

  h3 {
    font-weight: 700;
  }
`;

export const backgroundSettingWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  padding: 5px 0px;
`;

export const deviceWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

export const toggleWrapper = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

export const dropDown = css`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  width: inherit;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;

  z-index: 10;

  li {
    cursor: pointer;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.9);
  }

  div {
    ${ellipsis}
  }
`;

export const selectedType = css`
  ${ellipsis}

  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  margin: 8px 0;

  cursor: pointer;

  ::before {
    content: url(${dropdown});
    display: inline-block;
    width: 1rem;
    height: 1rem;
    opacity: 0.8;
    margin-right: 4px;
  }
`;
