import BackgroundSetting from './backgroundSetting';
import DeviceSetting from './deviceSetting';
import { settingWrapper } from './setting.styled';

const Setting = () => {
  return (
    <ul css={settingWrapper}>
      <BackgroundSetting />
      <DeviceSetting />
    </ul>
  );
};

export default Setting;
