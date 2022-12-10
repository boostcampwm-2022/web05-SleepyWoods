import { css } from '@emotion/react';
import help from '../../assets/icon/help.svg';
import help2 from '../../assets/icon/help2.svg';
import close from '../../assets/icon/close.svg';

export const helpBtn = css`
  width: 60px;
  height: 60px;

  position: absolute;
  bottom: 55px;
  right: 60px;
  background-image: url(${help2});
  background-repeat: no-repeat;
  background-position: center;
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

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border-radius: 0 20px 20px 20px;
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
    background-image: url(${close});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
