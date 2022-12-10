import { css } from '@emotion/react';
import theme from '../../styles/theme';
import close from '../../assets/icon/close.svg';

export const infoBox = css`
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

export const info = (content: string) => css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: ${theme.white};

  padding: 10px 20px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  ::after {
    content: '';
    display: 'block';
    width: 20px;
    height: 15px;
    background-image: url(${content});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

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

  position: fixed;
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

export const closeBtn = css`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  opacity: 0.7;
  padding: 5px;

  ::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background-image: url(${close});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export const header = css`
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const description = css`
  display: flex;
  flex-grow: 1;

  width: 100%;
`;

export const keyboard = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 250px;

  ul {
    display: flex;
    height: 100%;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 20px;

    img {
      justify-items: center;
      margin-top: 5px;
    }

    p {
      font-size: 14px;
      padding: 10px 0;
    }
  }
`;
