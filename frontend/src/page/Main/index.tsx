import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Background from '../../component/Background';
import MainContent from '../../component/MainContent';
import { userState } from '../../store/atom/user';

export const getCookieValue = (key: string) => {
  const cookieArr = document.cookie.split(';');
  let result = '';

  cookieArr.forEach((cookie: string) => {
    const [k, v] = cookie.split('=');
    if (k === key) result = v;
  });

  return result;
};

const Main = () => {
  return (
    <Background>
      <MainContent />
    </Background>
  );
};

export default Main;
