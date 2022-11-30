import { useRecoilState } from 'recoil';
import Content from '../Content';
import { backgroundSettingWrapper } from './setting.styled';
import Toggle from './toggle';
import { musicState, snowState } from '../../../store/atom/backgroundSetting';
import { emitter } from '../../Game/util';

const BackgroundSetting = () => {
  const [isMusicOn, setMusic] = useRecoilState(musicState);
  const [isSnowing, setSnowing] = useRecoilState(snowState);

  const handleMusicStatus = () => {
    setMusic(!isMusicOn);

    emitter.emit('musicControll', !isMusicOn);
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
