import { useState } from 'react';
import Content from '../Content';
import { backgroundSettingWrapper } from './setting.styled';
import Toggle from './toggle';

const BackgroundSetting = () => {
  const [isMusicOn, setMusic] = useState<boolean>(false);
  const [isSnowing, setSnowing] = useState<boolean>(false);

  const handleMusicStatus = () => {
    setMusic(!isMusicOn);
  };

  const handleSnowingStatus = () => {
    setSnowing(!isSnowing);
  };

  return (
    <Content>
      <h2 className="srOnly">환경 설정</h2>
      <div css={backgroundSettingWrapper}>
        <Toggle
          feature={'배경 음악'}
          status={isMusicOn}
          handleClick={handleMusicStatus}
        />
        <Toggle
          feature={'눈 내리기'}
          status={isSnowing}
          handleClick={handleSnowingStatus}
        />
      </div>
    </Content>
  );
};

export default BackgroundSetting;
