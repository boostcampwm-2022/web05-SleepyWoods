import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Chat from '../../component/Chat';
import Game from '../../component/Game';
import Loading from '../../component/Loading';
import Sidebar from '../../component/Sidebar';
import SleepyBoard from '../../component/SleepyBoard';
import Snow from '../../component/Snow';
import { pageGuard } from '../../guard';
import { snowState } from '../../store/atom/backgroundSetting';
import { devicePermissionState } from '../../store/atom/deviceSetting';

const Town = () => {
  pageGuard();

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const [permission, setPermission] = useRecoilState(devicePermissionState);
  const isSnowing = useRecoilValue(snowState);

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
      <Sidebar />
      <Game />
      {isSnowing && <Snow />}
      <SleepyBoard />
      <Chat />

      {isLoadingComplete || <Loading isClose={isClose} />}
    </>
  );
};

export default Town;
