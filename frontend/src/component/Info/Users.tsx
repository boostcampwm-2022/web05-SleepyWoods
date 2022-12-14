import * as style from './info.styled';
import users from '../../assets/icon/users.svg';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { userType } from '../../types/types';

const Users = () => {
  const socket = useRecoilValue(socketState);
  const [userCnt, setUseCnt] = useState(0);

  useEffect(() => {
    const initUserCnt = (data: userType[]) => setUseCnt(data.length);
    const plusUserCnt = () => setUseCnt(userCnt => userCnt + 1);
    const minusUserCnt = () => setUseCnt(userCnt => userCnt - 1);

    socket.on('userInitiated', initUserCnt);
    socket.on('userCreated', plusUserCnt);
    socket.on('userLeaved', minusUserCnt);

    return () => {
      socket.removeListener('userInitiated', initUserCnt);
      socket.removeListener('userCreated', plusUserCnt);
      socket.removeListener('userLeaved', minusUserCnt);
    };
  }, []);

  return <li css={style.info(users)}>{userCnt}</li>;
};
export default Users;
