import CarouselContent from './CarouselContent';
import NickNameContent from './NickNameContent';
import * as style from './mypage.styled';
import { useState } from 'react';
import Content from '../Content';
import { WithdrawalButton } from '../../Button';

const Mypage = () => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const handleIsWithdrawal = () => {
    setIsWithdrawal(!isWithdrawal);
  };

  const withdrawal = () => {
    // 비밀번호 확인 로직
    const check = confirm('정말 회원탈퇴 하실건가요..?');

    if (check) console.log('회원탈퇴!!');
  };

  return (
    <ul css={style.mypageWrapper}>
      <CarouselContent />
      <NickNameContent />
      <Content>
        <h2 css={style.header}>회원 탈퇴</h2>
        {isWithdrawal ? (
          <>
            <div css={style.infoMessage}>
              회원탈퇴를 위해 비밀번호를 입력해주세요
            </div>
            <input
              type="password"
              css={style.input}
              placeholder={'비밀번호를 입력해주세요.'}
            />
            <WithdrawalButton event={withdrawal} />
          </>
        ) : (
          <WithdrawalButton event={handleIsWithdrawal} />
        )}
      </Content>
    </ul>
  );
};
export default Mypage;
