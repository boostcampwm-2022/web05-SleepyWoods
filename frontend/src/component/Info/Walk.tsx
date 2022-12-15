import * as style from './info.styled';
import walk from '../../assets/icon/walk.svg';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { useEffect, useState } from 'react';
import { userState } from '../../store/atom/user';
import { userType } from '../../types/types';

const Walk = () => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const [walkCnt, setWalkCnt] = useState(0);

  useEffect(() => {
    const walkInitiated = (users: userType[]) => {
      users.forEach(userData => {
        if (userData.id !== user.id) return;

        setWalkCnt(() => userData.walk);
      });
    };
    socket.on('userInitiated', walkInitiated);

    const handleWalkCnt = (data: any) => {
      if (data.id === user.id) setWalkCnt(data.walk);
    };
    socket.on('move', handleWalkCnt);

    return () => {
      socket.removeListener('move', handleWalkCnt);
      socket.removeListener('userInitiated', walkInitiated);
    };
  }, [user]);

  return <li css={style.info(walk)}>{walkCnt}</li>;
};
export default Walk;
