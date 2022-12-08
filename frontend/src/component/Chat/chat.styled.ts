import { css } from '@emotion/react';
import { flexCenter } from '../../styles/mixin.styled';
import theme from '../../styles/theme';
import downArrow from '../../assets/icon/downArrow.svg';

export const chatContainer = () => css`
  position: absolute;
  bottom: 0;
  left: 50%;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 40%;
  min-width: 400px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px 10px 0 0;
  padding: 10px 10px 5px 10px;
`;

export const chatTextWrapper = (isExtend: boolean) => css`
  width: 100%;
  height: ${isExtend ? '200px' : '25px'};
  overflow: auto;
  transition: 0.5s;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.6);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 10px;
  }
`;

export const chatText = css`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: ${theme.white};
  line-height: 16px;
`;

export const chat = css`
  padding-bottom: 5px;

  > span {
    line-height: 20px;
  }
`;

export const chatUser = css`
  display: inline-block;
  color: black;
  font-weight: 900;
  background-color: rgba(255, 255, 255, 0.7);
  margin-right: 5px;
  padding: 2px 4px;
  border-radius: 5px;
`;

export const chatTime = css`
  margin-right: 5px;
`;

export const chatInputContainer = css`
  position: relative;
  width: 100%;
  margin-top: 10px;

  ::after {
    content: 'everyone :';
    position: absolute;
    font-size: 14px;
    line-height: 35px;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
`;

export const chatInput = css`
  width: 100%;
  height: 35px;
  padding-left: 80px;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 10px;
`;

export const extendBtn = (isExtend: boolean) => css`
  ${flexCenter}

  position: absolute;
  top: -21px;
  right: 15px;
  padding: 8px 10px 5px 10px;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px 5px 0 0;

  :after {
    content: '';
    display: block;
    width: 20px;
    height: 8px;
    background-image: url(${downArrow});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transform: rotate(${isExtend ? 0 : '180deg'});
  }
`;

export const info = css`
  color: ${theme.white};
  line-height: 20px;
`;
