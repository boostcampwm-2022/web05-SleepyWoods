import axios from 'axios';
import { FormEvent, MouseEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { friendsState } from '../../../store/atom/friends';
import { findFriend } from './friends.styled';

type nicknameType = {
  userId: string;
  isCalling: boolean;
  status: string;
  nickname: string;
};

const Search = () => {
  const [friends, setFriends] = useRecoilState(friendsState);
  const [searchWord, setSearchWord] = useState<string>('');
  const [nicknameList, setNicknameList] = useState<nicknameType[]>([]);

  const addToFriend = async (e: MouseEvent) => {
    const target = e.target as HTMLUListElement;

    if (target.classList.contains('none')) return;
    const selectedWord = target.innerText;

    setSearchWord('');
    setNicknameList([]);

    const response = confirm(`${selectedWord}를 친구추가 하시겠습니까?`);
    if (response) {
      try {
        const { data } = await axios.put(`/api/friendship/${selectedWord}`);

        setFriends({
          ...friends,
          [data.userId]: {
            id: data.userId,
            status: 'off',
            nickname: data.nickname,
            isCalling: false,
          },
        });

        alert('팔로우 되었습니다.');
      } catch {
        alert('팔로우 실패');
      }
    }
  };

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleSearchNickname = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const value = target.value;
    setSearchWord(value);

    if (!value) {
      setNicknameList([]);
      return;
    }
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      const { data: findList } = await axios(`/api/friendship/${value}`);

      if (findList.length) {
        setNicknameList(findList);
      } else if (value) {
        setNicknameList([
          {
            userId: 'none',
            nickname: '일치하는 유저가 없습니다.',
            isCalling: false,
            status: 'offline',
          },
        ]);
      }
    }, 100);

    setTimer(newTimer);
  };

  return (
    <section css={findFriend}>
      {nicknameList.length ? (
        <ul onClick={addToFriend}>
          {nicknameList.map(
            ({ nickname, userId }: { nickname: string; userId: string }) => (
              <li key={nickname} className={userId === 'none' ? 'none' : ''}>
                {nickname}
              </li>
            )
          )}
        </ul>
      ) : (
        <></>
      )}
      <input
        type="text"
        value={searchWord}
        placeholder="추가할 친구 이름"
        onInput={handleSearchNickname}
      />
    </section>
  );
};

export default Search;
