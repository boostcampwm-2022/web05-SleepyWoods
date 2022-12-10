import { css } from '@emotion/react';

export const description = css`
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
