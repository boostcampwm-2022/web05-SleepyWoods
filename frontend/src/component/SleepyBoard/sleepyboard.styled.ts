import { css } from '@emotion/react';
import tree from '../../assets/tree.svg';
import trophy from '../../assets/trophy.svg';
import like from '../../assets/icon/like.svg';
import unlike from '../../assets/icon/unlike.svg';
import { flexCenter } from '../../styles/mixin.styled';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 20px;
`;

export const title = css`
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

export const contentWrapper = css`
  width: 70%;
  height: 100%;
  padding: 5px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const content = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  width: 100%;
  height: 170px;
  padding: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-bottom: 15px;
`;

export const img = css`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  margin-right: 20px;
`;

export const contentInfo = css`
  flex-grow: 1;

  display: flex;
  flex-flow: column;
  height: 100%;
`;

export const user = (avatar: string) => css`
  font-size: 14px;
  line-height: 30px;
  font-weight: 700;
  padding-bottom: 25px;

  ::before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(${avatar});
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
    margin-right: 8px;
  }
`;

export const category = css`
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 15px;
`;

export const description = css`
  flex-grow: 1;

  width: 80%;
  font-size: 12px;
  font-weight: 700;
`;

export const time = css`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 10px;
  font-weight: 700;
`;

export const likeBtn = (isLike: boolean) => css`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 5px;

  ::after {
    content: '';
    display: block;
    width: 25px;
    height: 20px;
    background-image: url(${isLike ? like : unlike});
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
export const filterBtnBox = css`
  display: flex;
`;

export const filterBtn = (icon: string, width: number, height: number) => css`
  ${flexCenter}
  width: 60px;
  height: 40px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-left: 10px;

  ::after {
    content: '';
    display: block;
    width: ${width + 'px'};
    height: ${height + 'px'};
    background-image: url(${icon});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
