import { css } from '@emotion/react';
import close from '../../assets/icon/close.svg';
import copy from '../../assets/icon/copy.svg';
import check from '../../assets/icon/check.svg';
import { backgroundImage, flexCenter } from '../../styles/mixin.styled';
import theme from '../../styles/theme';

export const modal = (animation: string) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  width: 60%;
  min-width: 600px;
  max-width: 800px;
  height: 60%;
  min-height: 400px;
  max-height: 600px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);

  animation: ${animation} 0.3s ease-in-out;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const header = css`
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  padding: 20px;
  text-align: center;
`;

export const gameBox = css`
  ${flexCenter}

  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

export const gameItem = (isSelected: boolean) => css`
  padding: 7px 20px;
  border-radius: 20px;
  margin-left: 20px;

  background-color: ${isSelected ? theme.white09 : theme.white03};
  border: 1px solid ${isSelected ? theme.black : 'transparent'};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);

  :hover {
    border: 1px solid ${theme.black};
  }

  :nth-of-type(1) {
    margin: 0;
  }
`;

export const game = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  border-radius: 20px;
  background-color: ${theme.white05};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
`;

export const gameInfo = css`
  width: 100%;
  padding: 30px;
  text-align: center;
`;

export const gameDescription = css``;

export const selectModes = css`
  flex-grow: 1;
  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const friendMode = css`
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModeBtn = css`
  ${flexCenter}

  width: 50%;
  height: 60px;
  border-radius: 20px;
  background-color: ${theme.deepGreen};
  color: ${theme.white};

  :nth-of-type(1) {
    margin-bottom: 50px;
  }

  :hover {
    background-color: ${theme.green};
  }
`;

export const roomInput = css`
  flex-grow: 1;

  height: 50px;
  width: 50%;
  margin-right: 10px;
  border-radius: 10px;
  padding: 0 20px;

  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
`;

export const enterBtn = css`
  ${flexCenter}

  width: 80px;
  height: 50px;
  border-radius: 10px;
  background-color: ${theme.deepGreen};
  color: ${theme.white};

  :hover {
    background-color: ${theme.green};
  }
`;

export const enterCodeBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const enterCode = css`
  font-weight: 700;
  border-radius: 10px;
  line-height: 40px;
  padding: 0 10px;
  height: 40px;
  background-color: ${theme.white09};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  margin: 10px;
`;

export const copyBtn = (isCopy: boolean) => css`
  ${flexCenter}
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background-color: ${theme.green};

  ::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    ${backgroundImage(isCopy ? check : copy)}
    background-size: contain;
    opacity: 0.9;
  }
`;

export const enterCodeInfo = css`
  ${flexCenter}
  flex-flow: column;
  padding: 15px;

  p {
    padding-bottom: 10px;

    :nth-last-of-type(1) {
      color: ${theme.red};
    }
  }
`;

export const closeBtn = css`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  opacity: 0.7;
  padding: 5px;

  ::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;

    ${backgroundImage(close)}
    background-size: contain;
  }
`;

export const waitBox = css`
  ${flexCenter}

  flex-grow: 1;
  flex-flow: column;
  width: 100%;
`;

export const waitInfo = css`
  font-size: 20px;
  color: ${theme.deepGreen};
  padding-bottom: 20px;
`;

export const waitWrapper = css`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  width: 60%;
`;

export const waitHeader = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px 10px 20px;
`;

export const waitcnt = css`
  font-size: 16px;
  color: ${theme.red};
`;

export const waitUserBox = css`
  flex-grow: 1;
  width: 100%;
  padding: 20px;
  font-size: 14px;
  border-radius: 20px;
  background-color: ${theme.white05};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
`;

export const waitUser = css`
  padding-bottom: 10px;
  text-align: center;
`;

export const gameBtnBox = css`
  display: flex;
  gap: 10px;
`;

export const startBtn = css`
  ${flexCenter}

  margin-top: 20px;
  width: 100px;
  height: 30px;
  background-color: ${theme.green};
  border-radius: 10px;
`;

export const backBtn = css`
  ${flexCenter}

  margin-top: 20px;
  width: 100px;
  height: 30px;
  background-color: ${theme.red};
  color: ${theme.white};
  border-radius: 10px;
`;
