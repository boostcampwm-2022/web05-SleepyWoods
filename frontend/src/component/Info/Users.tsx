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
    socket.on('userInitiated', (data: userType[]) => {
      setUseCnt(data.length);
    });

    socket.on('userCreated', () => {
      setUseCnt(userCnt => userCnt + 1);
    });

    socket.on('userLeaved', () => {
      setUseCnt(userCnt => userCnt - 1);
    });

    return () => {
      socket.removeListener('userInitiated');
      socket.removeListener('userCreated');
      socket.removeListener('userLeaved');
    };
  }, []);

  return <li css={style.info(users)}>{userCnt}</li>;
};
export default Users;
