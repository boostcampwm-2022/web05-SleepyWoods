import { css } from '@emotion/react';
import sidebarOpen from '../../assets/sidebar-open.svg';
import { flexCenter } from '../../styles/mixin.styled';

export const sidebarWrapper = css`
  position: absolute;
  top: 0;
  left: 0;

  width: 300px;
  height: 100%;
`;

export const sidebar = (isOpen: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: ${isOpen ? '300px' : '0'};
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  transform: ${isOpen ? 'none' : 'translateX(-300px)'};
  transition: all 500ms ease-in-out;

  z-index: 10;
`;

export const toggleButton = (isOpen: boolean) => css`
  position: absolute;
  top: 20px;
  right: -30px;

  transform: ${isOpen ? 'none' : 'translateX(-300px)'};
  transition: all 500ms ease-in-out;

  ${flexCenter}

  width: 30px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 5px 5px 0;

  cursor: pointer;

  ::after {
    content: url(${sidebarOpen});
  }

  z-index: 10;
`;
