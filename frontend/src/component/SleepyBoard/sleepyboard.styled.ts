import { css } from '@emotion/react';
import tree from '../../assets/tree.svg';
import trophy from '../../assets/trophy.svg';

export const sleepyBoardBtn = css`
  width: 60px;
  height: 60px;

  position: absolute;
  bottom: 30px;
  right: 30px;
  background-image: url(${trophy});
  background-repeat: no-repeat;
  background-position: center;
`;

export const modal = (animation: string) => css`
  width: 50%;
  height: 60%;
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
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 5px;
  padding: 10px 20px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  ::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(${tree});
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-left: 5px;
  }
`;
