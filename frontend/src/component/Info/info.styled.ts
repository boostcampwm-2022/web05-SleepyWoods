import { css } from '@emotion/react';
import theme from '../../styles/theme';
import close from '../../assets/icon/close.svg';
import checkBox from '../../assets/icon/checkBox.svg';
import { flexCenter } from '../../styles/mixin.styled';

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

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }

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
  text-align: center;
`;

export const content = css`
  overflow: auto;
  padding: 5px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 10px;
  }
`;

export const helpSettingWrapper = css`
  width: 100%;
  font-size: 12px;
  padding-top: 20px;
  text-align: center;
`;

export const helpSetting = (isCheck: boolean) => css`
  ${flexCenter}
  padding-top: 10px;

  button {
    margin-left: 5px;
    width: 14px;
    height: 14px;
    background-image: url(${checkBox});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: ${isCheck ? 1 : 0.3};
  }
`;
