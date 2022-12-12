import { css } from '@emotion/react';
import tree from '../../assets/tree.svg';
import trophy from '../../assets/trophy.svg';
import like from '../../assets/icon/like.svg';
import unlike from '../../assets/icon/unlike.svg';
import close from '../../assets/icon/close.svg';
import { flexCenter } from '../../styles/mixin.styled';
import theme from '../../styles/theme';

export const sleepyBoardBtn = css`
  width: 60px;
  height: 60px;

  position: absolute;
  bottom: 55px;
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

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 20px;
`;

export const contentWrapper = css`
  width: 80%;
  min-width: 450px;
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

export const likeBtn = (isLiked: boolean) => css`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 5px;

  ::after {
    content: '';
    display: block;
    width: 25px;
    height: 20px;
    background-image: url(${isLiked ? like : unlike});
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
export const filterBtnBox = css`
  display: flex;
  margin-bottom: 5px;
`;

export const filterBtn = (isSelected: boolean, icon: string) => css`
  ${flexCenter}
  width: 80px;
  height: 40px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-left: 15px;
  font-weight: 900;
  ${isSelected && 'background-color: white;'}

  ::after {
    content: '';
    display: ${icon ? 'block' : 'none'};
    width: 22px;
    height: 18px;
    background-image: url(${icon});
    background-repeat: no-repeat;
    background-size: contain;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const tabWrapper = css`
  display: flex;
  position: absolute;
  top: -39.6px;
  left: 0;
`;

export const tab = (selected: boolean) => css`
  width: 250px;
  height: 40px;
  border-radius: 15px 15px 0 0;
  background-color: ${selected
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(255, 255, 255, 0.7)'};
`;

export const tabBtn = css`
  ${flexCenter};

  letter-spacing: 3px;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;

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

export const selectMonthBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 10%;
  margin-bottom: 10px;
`;

export const selectMonth = (isSelected: boolean) => css`
  ${flexCenter}
  ${isSelected && 'background-color: white;'};

  width: 30%;
  height: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgb(0 0 0 / 25%);
`;

export const topRankContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: column;

  width: 100%;
  height: 25%;
  padding: 20px 30px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin-bottom: 20px;

  > li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const rankContainer = css`
  width: 100%;
  height: 50%;

  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  > li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
`;

export const nickname = (str: string) => css`
  ::before {
    content: '${str}';
    display: inline-block;
    padding-right: 15px;
  }
`;

export const infoMsg = css`
  color: ${theme.red};
  font-size: 14px;
  text-align: center;
  padding: 20px;
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
