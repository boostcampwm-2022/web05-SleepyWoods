import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { devicePermissionState } from '../../../store/atom/deviceSetting';
import Device from './device';
import { deviceListType } from './setting';
import { deviceWrapper } from './setting.styled';

const DeviceSetting = () => {
  const permission = useRecoilValue(devicePermissionState);
  const [deviceList, setDeviceList] = useState<deviceListType>();

  useEffect(() => {
    const getDevice = async () => {
      const data = await navigator.mediaDevices.enumerateDevices();

      if (!permission) return;

      const initialValue: deviceListType = {
        speaker: [],
        audio: [],
        video: [],
      };

      data.forEach(device => {
        const { deviceId, groupId, kind, label } = device;

        const type =
          kind == 'audiooutput'
            ? 'speaker'
            : kind == 'audioinput'
            ? 'audio'
            : 'video';

        initialValue[type].push({
          deviceId: deviceId,
          groupId: groupId,
          label: label,
        });
      });

      setDeviceList(initialValue);
    };

    getDevice();
  }, []);

  return (
    <>
      <h2 className="srOnly">디바이스 세팅</h2>
      {deviceList && (
        <div css={deviceWrapper} onClick={() => {}}>
          <Device kind={'스피커'} device={deviceList.speaker} />
          <Device kind={'마이크'} device={deviceList.audio} />
          <Device kind={'카메라'} device={deviceList.video} />
        </div>
      )}
    </>
  );
};

export default DeviceSetting;
