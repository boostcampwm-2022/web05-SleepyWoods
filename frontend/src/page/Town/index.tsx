import { useEffect, useState } from 'react';
import Game from '../../component/Game';
import Sidebar from '../../component/Sidebar';
import Snow from '../../component/Snow';

const Town = () => {
  // 전역으로 관리할 예정 (이후 props drilling 제거)
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const getDevicePermission = async () => {
      const constraints = { audio: true, video: true };
      const permission = await navigator.mediaDevices.getUserMedia(constraints);
      setPermission(permission.active);
    };

    getDevicePermission();
  }, []);

  return (
    <>
      <Sidebar permission={permission} />
      <Game />
      <Snow />
    </>
  );
};

export default Town;
