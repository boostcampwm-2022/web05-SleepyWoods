import CarouselContent from './CarouselContent';
import NickNameContent from './NickNameContent';
import * as style from './mypage.styled';
import { ChangeEvent, useState } from 'react';
import Content from '../Content';
import { WithdrawalButton } from '../../Button';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/atom/user';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const Mypage = () => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const user = useRecoilValue(userState);

  const handleIsWithdrawal = () => {
    setIsWithdrawal(!isWithdrawal);
  };

  const withdrawal = async () => {
    if (user.nickname === inputValue) {
      const check = confirm('다시는 돌아올 수 없습니다?!');

      if (check) {
        const res = await axios.delete('/api/user');
        if (res.status === 200) location.href = '/';
        else alert('다시 시도해주세요');
      }
    } else {
      alert('닉네임을 확인해주세요');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <ul css={style.mypageWrapper}>
      <CarouselContent />
      <NickNameContent />
      <LogoutButton />
      <Content>
        <h2 css={style.header}>회원 탈퇴</h2>
        {isWithdrawal ? (
          <>
            <div css={style.infoMessage}>
              회원탈퇴를 위해 닉네임을 입력해주세요
            </div>
            <input
              type="text"
              css={style.input}
              placeholder={user.nickname}
              value={inputValue}
              onChange={handleChange}
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
