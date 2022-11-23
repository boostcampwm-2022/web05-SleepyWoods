import BackgroundSetting from './backgroundSetting';
import DeviceSetting from './deviceSetting';
import { settingWrapper } from './setting.styled';

const Setting = ({ permission }: { permission: boolean }) => {
  return (
    <ul css={settingWrapper}>
      <BackgroundSetting />
      <DeviceSetting permission={permission} />
    </ul>
  );
};

export default Setting;
