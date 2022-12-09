import { MouseEvent, useEffect, useState } from 'react';
import { sidebarWrapper, sidebar, toggleButton } from './sidebar.styled';
import Mypage from './Mypage';

import mypage from '../../assets/icon/mypageIcon.svg';
import friends from '../../assets/icon/friendsListIcon.svg';
import chatting from '../../assets/icon/chattingIcon.svg';
import setting from '../../assets/icon/settingIcon.svg';
import micOn from '../../assets/icon/mic-on.svg';
import camOn from '../../assets/icon/cam-on.svg';
import micOff from '../../assets/icon/mic-off.svg';
import camOff from '../../assets/icon/cam-off.svg';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Friends from './Friends';
import Setting from './Setting';
import Chat from './Chat';
import { useRecoilState } from 'recoil';
import { sidebarState } from '../../store/atom/sidebar';

type componentType = {
  [key: string]: EmotionJSX.Element;
};

const component: componentType = {
  mypage: <Mypage />,
  friends: <Friends />,
  chatting: <Chat />,
  setting: <Setting />,
};

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isMicOn, setMic] = useState(false);
  const [isCamOn, setCam] = useState(true);

  const [currentTab, setCurrentTab] = useRecoilState(sidebarState);

  const changeTab = (e: MouseEvent) => {
    const navList = e.currentTarget.children;
    const target = e.target as HTMLElement;

    if (target.tagName !== 'IMG') return;

    [...navList].forEach((node: Element) => {
      const name = node.id;
      const $img = node.children[0];

      $img === target && setCurrentTab(name);
    });
  };

  return (
    <aside css={sidebarWrapper(isOpen, currentTab)}>
      <div css={sidebar}>
        <nav className="sidebar-tab">
          <ul onClick={changeTab}>
            <li id="mypage">
              <img src={mypage} alt="마이페이지"></img>
            </li>
            <li id="friends">
              <img src={friends} alt="친구목록"></img>
            </li>
            <li id="chatting">
              <img src={chatting} alt="채팅"></img>
            </li>
            <li id="setting">
              <img src={setting} alt="환경 설정"></img>
            </li>
          </ul>
        </nav>
        <section className="sidebar-content">{component[currentTab]}</section>
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
      <button
        type="button"
        css={toggleButton}
        onClick={() => setOpen(!isOpen)}></button>
    </aside>
  );
};

export default Sidebar;
