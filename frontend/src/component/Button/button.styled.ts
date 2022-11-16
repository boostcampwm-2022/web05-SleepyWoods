import { css } from '@emotion/react';
import theme from '../../theme';
import { backgroundImage } from '../../styles/mixin.styled';
import prevArrow from '../../assets/prevArrow.svg';
import nextArrow from '../../assets/nextArrow.svg';

export const buttons = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
`;

export const button = (type: string) => css`
  width: 300px;
  height: 50px;
  background-color: ${type === 'dark' ? theme.black : theme.white};
  color: ${type === 'dark' ? theme.white : theme.black};
  opacity: 0.9;
  border-radius: 20px;
  font-weight: 700;
  text-align: center;
`;

export const signButton = (type: string) => css`
  min-width: 200px;
  min-height: 40px;
  background-color: ${type === 'naver' ? '#26C825' : '#FFEB00'};
  color: ${type === 'naver' ? theme.white : theme.black};

  border-radius: 10px;
  font-weight: 700;
  text-align: center;
`;

export const signupButton = () => css`
  padding: 10px 30px;
  margin-top: 30px;
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
