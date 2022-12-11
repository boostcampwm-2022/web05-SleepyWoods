import { css } from '@emotion/react';
import theme from '../../../styles/theme';

export const description = css`
  width: 100%;

  & > p {
    padding: 15px;
    font-size: 14px;
    text-align: center;

    span {
      width: 14px;
      height: 14px;
      display: inline-block;
      background-color: ${theme.black06};
      color: ${theme.white};
      border-radius: 4px;
    }
  }
`;

export const subContentBox = css``;

export const subContent = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);

  :nth-of-type(1) {
    margin-top: 20px;
  }
  :nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;

export const subTitle = css`
  padding-bottom: 30px;
  font-weight: 700;
`;

export const subDescription = css`
  flex-grow: 1;
  height: 200px;
  padding: 10px 20px;
  background-color: ${theme.white05};

  & > p {
    width: 100%;
    padding-bottom: 15px;
    font-size: 14px;
  }
`;
