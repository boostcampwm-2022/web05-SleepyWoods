import * as style from './info.styled';
import walk from '../../assets/icon/walk.svg';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { useEffect, useState } from 'react';
import { userState } from '../../store/atom/user';

const Walk = () => {
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);
  const [walkCnt, setWalkCnt] = useState(0);

  useEffect(() => {
    const handleWalkCnt = (data: any) => {
      if (data.id === user.id) setWalkCnt(data.walk);
    };
    socket.on('move', handleWalkCnt);

    return () => {
      socket.removeListener('move', handleWalkCnt);
    };
  }, [user]);

  return <li css={style.info(walk)}>{walkCnt}</li>;
};
export default Walk;
