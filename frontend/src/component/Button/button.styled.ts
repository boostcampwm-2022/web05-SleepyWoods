import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { backgroundImage, flexCenter } from '../../styles/mixin.styled';
import prevArrow from '../../assets/prevArrow.svg';
import nextArrow from '../../assets/nextArrow.svg';
import social from '../../styles/social';

export const buttons = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  width: 300px;
`;

export const button = (type: string) => css`
  width: 300px;
  height: 50px;
  background-color: ${type === 'dark' ? theme.black : theme.white};
  color: ${type === 'dark' ? theme.white : theme.black};
  opacity: 0.8;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
  transition: 0.3s;

  :hover {
    opacity: 1;
  }
`;

export const signButton = (type: string) => css`
  width: 90%;
  min-width: 200px;
  height: 40px;
  background-color: ${social.background[type]};
  color: ${social.color[type]};

  border-radius: 10px;
  font-weight: 700;
  text-align: center;

  box-shadow: 2px 2px 5px 1px rgba(100, 100, 100, 0.3);
`;

export const signupButton = () => css`
  padding: 10px 30px;
  border-radius: 20px;
  background-color: ${theme.lightGreen};

  :hover {
    background-color: ${theme.deepGreen};
    color: ${theme.white};
  }
`;

export const arrowButton = (type: string) => css`
  min-width: 30px;
  min-height: 40px;

  ${backgroundImage(type === 'prev' ? prevArrow : nextArrow)}
`;

export const userChangeButton = css`
  ${flexCenter}

  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.lightGreen};
  font-size: 14px;

  :hover {
    background-color: ${theme.green};
  }
`;

export const withdrawalBtn = css`
  ${flexCenter}

  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.red};
  font-size: 12px;
`;
