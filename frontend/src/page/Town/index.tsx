import { useEffect, useState } from 'react';
import Game from '../../component/Game';
import Loading from '../../component/Loading';
import Sidebar from '../../component/Sidebar';
import SleepyBoard from '../../component/SleepyBoard';
import Snow from '../../component/Snow';

const Town = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isClose, setIsClose] = useState(false);

  // 전역으로 관리할 예정 (이후 props drilling 제거)
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const getDevicePermission = async () => {
      const constraints = { audio: true, video: true };
      const permission = await navigator.mediaDevices.getUserMedia(constraints);
      setPermission(permission.active);
    };

    getDevicePermission();
    setTimeout(() => {
      setIsClose(true);
      setTimeout(() => {
        setIsLoadingComplete(true);
      }, 800);
    }, 1500);
  }, []);

  return (
    <>
      <Sidebar permission={permission} />
      <Game />
      <Snow />
      <SleepyBoard />

      {isLoadingComplete || <Loading isClose={isClose} />}
    </>
  );
};

export default Town;
