import { css } from '@emotion/react';
import sidebarOpen from '../../assets/sidebar-open.svg';
import sidebarClose from '../../assets/sidebar-close.svg';
import { flexCenter } from '../../styles/mixin.styled';

export const sidebarWrapper = (isOpen: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: 300px;
  height: 100%;

  transform: translateX(${isOpen ? '0' : '-300'}px);
  transition: all 500ms ease-in-out;

  button::after {
    content: url(${isOpen ? sidebarClose : sidebarOpen});
  }
`;

export const sidebar = css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 10;
`;

export const toggleButton = css`
  position: absolute;
  top: 20px;
  right: -30px;

  ${flexCenter}

  width: 30px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 5px 5px 0;

  cursor: pointer;

  z-index: 10;
`;
