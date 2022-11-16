import { css } from '@emotion/react';
import theme from '../../theme';
import { flexCenter, backgroundImage } from '../../styles/mixin.styled';
import prevArrow from '../../assets/prevArrow.svg';
import nextArrow from '../../assets/nextArrow.svg';
import baseCharacter from '../../assets/character/waiting/base_waiting_strip9.png';

export const header = css`
  font-weight: 700;
  font-size: 36px;
`;

export const characterWrapper = css`
  ${flexCenter}

  width: 150px;
  height: 200px;
  overflow: hidden;
`;

export const character = (hair: string) => css`
  position: relative;
  width: 96px;
  height: 64px;
  background-image: url(${baseCharacter});
  background-repeat: no-repeat;
  animation: wait 0.6s step-start infinite;
  transform: scale(6);

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 96px;
    height: 64px;
    background-image: url(${hair});
    background-repeat: no-repeat;
    animation: wait 0.6s step-start infinite;
  }

  @keyframes wait {
    0% {
      background-position: 0 0;
    }
    12.5% {
      background-position: -96px 0;
    }
    25% {
      background-position: -192px 0;
    }
    37.5% {
      background-position: -288px 0;
    }
    50% {
      background-position: -384px 0;
    }
    62.5% {
      background-position: -480px 0;
    }
    75% {
      background-position: -576px 0;
    }
    97.5% {
      background-position: -672px 0;
    }
    100% {
      background-position: -768px 0;
    }
  }
`;

export const nicknameContainer = css`
  ${flexCenter}
  flex-flow: column;

  width: 100%;
`;

export const nickname = css`
  width: 80%;
  min-height: 50px;
  border: 1px solid ${theme.gray};
  border-radius: 10px;
  padding: 10px;
`;

export const signupBtn = css`
  padding: 10px 30px;
  margin-top: 30px;
  border-radius: 20px;
  background-color: ${theme.lightGreen};

  :hover {
    background-color: ${theme.deepGreen};
    color: ${theme.white};
  }
`;

export const prevBtn = css`
  ${backgroundImage(prevArrow)}

  width: 30px;
  height: 40px;
`;

export const nextBtn = css`
  ${backgroundImage(nextArrow)}

  width: 30px;
  height: 40px;
`;

export const CarowselContainer = css`
  ${flexCenter}

  flex-flow: row;
  gap: 50px;
`;
