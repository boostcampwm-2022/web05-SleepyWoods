import { css } from '@emotion/react';
import { backgroundImage } from '../../styles/mixin.styled';
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

export const VideoStyle = (connectVideo: boolean) => css`
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
  max-width: 1000px;
  background-color: ${theme.black};

  ${connectVideo || 'display: none;'};

  video {
    width: 180px;
    height: 100%;
    background: ${theme.white};
  }

  button {
    width: 50px;
    height: 20px;
    border-radius: 5px;
    background-color: ${theme.red};
    color: ${theme.white};

    ${connectVideo || 'display: none;'};
  }
`;
