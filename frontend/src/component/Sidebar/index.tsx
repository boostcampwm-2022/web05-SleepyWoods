import { useState } from 'react';
import { sidebarWrapper, sidebar, toggleButton } from './sidebar.styled';
import mypage from '../../assets/icon/mypageIcon.svg';
import friendsList from '../../assets/icon/friendsListIcon.svg';
import chatting from '../../assets/icon/chattingIcon.svg';
import setting from '../../assets/icon/settingIcon.svg';
import micOn from '../../assets/icon/mic-on.svg';
import camOn from '../../assets/icon/cam-on.svg';
import micOff from '../../assets/icon/mic-off.svg';
import camOff from '../../assets/icon/cam-off.svg';

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const [isMicOn, setMic] = useState(false);
  const [isCamOn, setCam] = useState(true);

  // 확장성 고려하여 함수로 분리
  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <aside css={sidebarWrapper(isOpen)}>
      <div css={sidebar}>
        <nav className="sidebar-tab">
          <ul>
            <li>
              <img src={mypage} alt="마이페이지"></img>
            </li>
            <li>
              <img className="active" src={friendsList} alt="친구목록"></img>
            </li>
            <li>
              <img src={chatting} alt="채팅"></img>
            </li>
            <li>
              <img src={setting} alt="환경 설정"></img>
            </li>
          </ul>
        </nav>

        <section className="sidebar-content">
          {/* 이 위치에 component */}
        </section>

        <section className="sidebar-setting">
          <ul>
            <li onClick={() => setMic(!isMicOn)}>
              {isMicOn ? (
                <img src={micOn} alt="마이크 on"></img>
              ) : (
                <img src={micOff} alt="마이크 off"></img>
              )}
            </li>
            <li onClick={() => setCam(!isCamOn)}>
              {isCamOn ? (
                <img src={camOn} alt="카메라 on"></img>
              ) : (
                <img src={camOff} alt="카메라 off"></img>
              )}
            </li>
          </ul>
        </section>
      </div>
      <button type="button" css={toggleButton} onClick={handleClick}></button>
    </aside>
  );
};

export default Sidebar;
