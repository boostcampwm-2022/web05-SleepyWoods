import { css } from '@emotion/react';
import sidebarOpen from '../../assets/sidebar-open.svg';
import sidebarClose from '../../assets/sidebar-close.svg';
import { flexCenter } from '../../styles/mixin.styled';

export const sidebarWrapper = (isOpen: boolean, currentTab: string) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: 300px;
  height: 100%;

  z-index: 10;

  transform: translateX(${isOpen ? '0' : '-300'}px);
  transition: all 500ms ease-in-out;

  & > button::after {
    content: url(${isOpen ? sidebarClose : sidebarOpen});
  }

  img {
    cursor: pointer;
    opacity: 0.5;

    :hover {
      opacity: 0.8;
    }
  }

  li#${currentTab} {
    img {
      opacity: 1;
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
    padding: 20px;
  }

  .sidebar-setting {
    height: 35px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    padding: 20px 10px;
    margin: 0 20px 15px;

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
