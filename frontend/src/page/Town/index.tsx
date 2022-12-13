import { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Call from '../../component/Call';
import Chat from '../../component/Chat';
import Game from '../../component/Game';
import { emitter } from '../../component/Game/util';
import Info from '../../component/Info';
import Loading from '../../component/Loading';
import MiniGame from '../../component/MiniGame';
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

  const setPermission = useSetRecoilState(devicePermissionState);
  const isSnowing = useRecoilValue(snowState);

  useEffect(() => {
    emitter.on('game-start', () => {
      setTimeout(() => {
        setIsClose(true);
        setTimeout(() => {
          setIsLoadingComplete(true);
        }, 800);
      }, 500);
    });

    const getDevicePermission = async () => {
      const constraints = { audio: true, video: true };
      const permission = await navigator.mediaDevices.getUserMedia(constraints);
      setPermission(permission.active);
    };

    getDevicePermission();
  }, []);

  return (
    <>
      <Call />
      <Sidebar />
      <Game />
      {isSnowing && <Snow />}
      <SleepyBoard />
      <MiniGame />
      <Chat />
      <Info />

      {isLoadingComplete || <Loading isClose={isClose} />}
    </>
  );
};

export default Town;
