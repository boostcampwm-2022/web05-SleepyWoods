import { css } from '@emotion/react';
import phoneIcon from '../../../assets/icon/phoneIcon.svg';
import addFriendIcon from '../../../assets/icon/addFriendIcon.svg';
import { backgroundImage } from '../../../styles/mixin.styled';
import theme from '../../../styles/theme';

export const FriendsTabWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  gap: 20px;
`;

export const friendListWrapper = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  max-height: 300px;
  height: 35vh;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    margin: auto 0;
    text-align: center;
    line-height: 30px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export const callingList = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  height: 250px;
  ${backgroundImage(phoneIcon)};

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const friendItemWrapper = (isOnline: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5px;
  padding: 7px 5px;
  ${!isOnline && 'opacity: 0.5;'}

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
`;

export const userName = (state: string) => css`
  font-weight: 700;

  ::before {
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${state === 'on'
      ? theme.green
      : state === 'off'
      ? theme.red
      : theme.yellow};
  }
`;

export const findFriend = css`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;

  ul {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-flow: column nowrap;
    gap: 8px;

    width: 180px;
    transform: translate(50px, -100%);
    background-color: rgba(245, 245, 245, 0.9);
    border-radius: 10px;
    padding: 5px;
    margin-top: -5px;

    li {
      border-radius: 5px;
      font-weight: 700;
      padding: 5px;

      &:not(.none):hover {
        cursor: pointer;
        color: ${theme.green};
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  ::before {
    content: url(${addFriendIcon});
  }

  input {
    width: 70%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
  }
`;
