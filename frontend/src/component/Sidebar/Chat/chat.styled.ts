import { css } from '@emotion/react';
import { flexCenter } from '../../../styles/mixin.styled';
import theme from '../../../styles/theme';
import prevArrow from '../../../assets/prevArrow.svg';

export const chatContainer = css`
  height: 100%;
`;

export const chatWrapper = (isClose: boolean) => css`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  animation: ${isClose ? 'close' : 'show'} 0.3s;

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const chatItemWrapper = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const chatInfo = (unreadCount: number) => css`
  ${flexCenter};

  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;

  .user {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .timestamp {
    font-size: 10px;
    margin-left: 10px;
  }

  ::before {
    content: ${unreadCount ? unreadCount : ''};
    ${unreadCount ? flexCenter : ''};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 15px;
    height: 15px;
    font-size: 10px;
    font-weight: 700;

    border-radius: 50%;
    background-color: ${theme.green};
  }
`;
export const message = css`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
`;

export const emptyMessage = css`
  ${flexCenter}

  width: 100%;
  padding-top: 10px;
  font-weight: 700;
`;

export const chatUserBox = css`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 30px;

  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
`;

export const prevBtn = css`
  ${flexCenter}

  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  width: 25px;
  height: 25px;

  ::after {
    content: '';
    display: block;
    width: 10px;
    height: 15px;
    background-image: url(${prevArrow});
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const chatUserName = css`
  ${flexCenter}

  width: 100%;
`;

export const textWrapper = css`
  /* flex-grow: 1; */
  height: calc(100vh - 345px);
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const chatItem = (isSender: boolean) => css`
  display: flex;
  flex-flow: column;
  align-items: ${isSender ? 'flex-start' : 'flex-end'};
  margin-bottom: 10px;

  :last-of-type {
    padding-bottom: 0;
  }
`;

export const chatText = (isSender: boolean) => css`
  font-size: 14px;
  max-width: 90%;
  word-break: break-word;
  border-radius: 10px;
  padding: 5px 10px;

  background-color: ${isSender ? theme.white : theme.lightGreen};
`;

export const chatTime = css`
  padding-top: 4px;
  font-size: 10px;
`;

export const chatConatiner = (isClose: boolean) => css`
  display: flex;
  flex-flow: column;
  justify-content: space-around;

  width: 100%;
  height: 100%;

  animation: ${isClose ? 'close' : 'show'} 0.3s;

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const chattingInput = css`
  width: 100%;
  height: 35px;
  padding-left: 10px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
`;
