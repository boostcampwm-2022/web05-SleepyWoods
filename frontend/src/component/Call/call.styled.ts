import { css } from '@emotion/react';
import { backgroundImage, flexCenter } from '../../styles/mixin.styled';
import theme from '../../styles/theme';
import rejectCall from '../../assets/icon/rejectCall.svg';
import acceptCall from '../../assets/icon/acceptCall.svg';

export const callingWrapper = css`
  position: fixed;
  right: 0;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 8px;

  padding: 15px;
`;

export const callingItem = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  width: 200px;
  height: 50px;
  border-radius: 30px;
  background-color: ${theme.white09};

  padding: 0 10px 0 20px;

  span {
    font-weight: 700;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    button {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .reject {
      background-color: ${theme.red};
      ${backgroundImage(rejectCall)}
    }

    .accept {
      background-color: ${theme.green};
      ${backgroundImage(acceptCall)}
    }
  }
`;

export const videoStyle = (connectVideo: boolean) => css`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 20px;

  width: 80%;

  ${connectVideo || 'display: none;'};

  video {
    width: 200px;
    height: 150px;
    background: ${theme.white};
    border-radius: 10px 10px 0 0;
  }
`;

export const videoBox = css`
  ${flexCenter}
  flex-flow: column;
`;

export const videoController = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 5px 15px;
  background-color: ${theme.white07};
  border-radius: 0 0 10px 10px;

  > span {
    font-size: 14px;
  }
`;

export const controllerBox = css`
  display: flex;
  gap: 4px;
`;

export const controllerBtn = (img: string) => css`
  width: 14px;
  height: 14px;

  ${backgroundImage(img)}
`;

export const rejectBtn = (connectVideo: boolean) => css`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${theme.red};
  ${backgroundImage(rejectCall)}

  ${connectVideo || 'display: none;'};
`;
