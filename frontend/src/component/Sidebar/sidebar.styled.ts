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

  img {
    cursor: pointer;
    opacity: 0.5;

    &.active {
      opacity: 1;
    }

    :hover {
      opacity: 0.8;
    }
  }
`;

export const sidebar = css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 10;

  .sidebar-tab {
    width: 100%;
    height: 100px;

    ul {
      width: 90%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-left: 5%;
      padding: 0 5%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }
  }

  .sidebar-content {
    width: 100%;
    height: 100%;
  }

  .sidebar-setting {
    height: 35px;
    margin: 10px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;

    ul {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
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
