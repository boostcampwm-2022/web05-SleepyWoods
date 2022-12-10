import * as style from './sidebarInfo.styled';
import * as commonStyle from './common.styled';
import sidebarImg from '../../../assets/sidebarImg.png';
import mypageImg from '../../../assets/info-mypage.png';
import friendsImg from '../../../assets/info-friends.png';
import chatImg from '../../../assets/info-chat.png';
import settingImg from '../../../assets/info-setting.png';

const SidebarInfo = () => {
  return (
    <div css={commonStyle.infoContainer}>
      <h4 css={commonStyle.header}>- 사이드바</h4>
      <div css={style.description}>
        <img src={sidebarImg} alt="사이드바 이미지" width={'100%'} />
        <p>
          왼쪽 상단의 <span>{'>'}</span> 버튼을 클릭하면 사이드바를 볼 수
          있습니다.
        </p>
        <p>
          사이드바 상단의 버튼을 클릭해 다음과 같은 기능을 사용할 수 있습니다.
        </p>
        <ul css={style.subContentBox}>
          <li css={style.subContent}>
            <img
              src={mypageImg}
              alt="마이페이지 이미지"
              height={'200px'}
              width={'100px'}
            />
            <div css={style.subDescription}>
              <h4 css={style.subTitle}>1. 마이페이지</h4>
              <p>
                <strong>캐릭터 변경, 닉네임 수정, 로그아웃, 회원탈퇴</strong>를
                할 수 있습니다.
              </p>
              <p>
                회원탈퇴를 하는 경우{' '}
                <span>같은 계정으로 다시는 회원가입할 수 없습니다.</span>
              </p>
            </div>
          </li>
          <li css={style.subContent}>
            <img
              src={friendsImg}
              alt="친구목록 이미지"
              height={'200px'}
              width={'100px'}
            />
            <div css={style.subDescription}>
              <h4 css={style.subTitle}>2. 친구목록</h4>
              <p>
                <strong>친구목록</strong>을 볼 수 있습니다.
              </p>
              <p>
                유저를 검색해서 <strong>친구추가</strong> 할 수 있습니다.
              </p>
              <p>
                친구목록의 아이콘을 클릭해 <strong>1:1 채팅 및 친구끊기</strong>
                가 가능합니다.
              </p>
              <p>
                친구를 아래로 드래그해서 <strong>영상통화</strong>가 가능합니다.
              </p>
            </div>
          </li>
          <li css={style.subContent}>
            <img
              src={chatImg}
              alt="일대일 채팅 이미지"
              height={'200px'}
              width={'100px'}
            />
            <div css={style.subDescription}>
              <h4 css={style.subTitle}>3. 1:1 채팅</h4>
              <p>
                <strong>채팅방 목록</strong>이 보여집니다.
              </p>
              <p>
                각각 채팅방에는{' '}
                <strong>닉네임, 시각, 마지막 메세지, 읽지않은 메세지</strong>가
                표시됩니다.
              </p>
              <p>
                채팅방을 클릭해 다른 유저와 <strong>실시간 1:1 채팅</strong>을
                할 수 있습니다.
              </p>
            </div>
          </li>
          <li css={style.subContent}>
            <img
              src={settingImg}
              alt="환경설정 이미지"
              height={'200px'}
              width={'100px'}
            />
            <div css={style.subDescription}>
              <h4 css={style.subTitle}>4. 환경설정</h4>
              <p>
                <strong>배경음악 및 눈내리기 효과를 on/off</strong> 할 수
                있습니다.
              </p>
              <p>
                영상통화에 사용되는 <strong>기기(카메라, 마이크)를 설정</strong>
                할 수 있습니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarInfo;
