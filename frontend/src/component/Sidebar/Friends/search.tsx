import { FormEvent, MouseEvent, useState } from 'react';
import { findFriend } from './friends.styled';

const testSearchWord = (word: string) =>
  ['k', 'kt', 'ktm', 'ktmi', 'ktmih', 'ktmihs'].filter(
    name => name.indexOf(word) !== -1
  );

const Search = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [nicknameList, setNicknameList] = useState<string[]>([]);

  const addToFriend = (e: MouseEvent) => {
    const target = e.target as HTMLUListElement;

    const selectedWord = target.innerText;

    setSearchWord('');
    setNicknameList([]);

    const response = confirm(`${selectedWord}를 친구추가 하시겠습니까?`);
    if (response) console.log('서버로 요청 보내기');
  };

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleSearchNickname = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    const value = target.value;
    setSearchWord(value);

    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      // 서버로 리스트 받아오는 요청 보내기
      const findList = testSearchWord(value);
      setNicknameList(findList);
    }, 500);

    setTimer(newTimer);
  };

  return (
    <section css={findFriend}>
      {nicknameList.length ? (
        <ul onClick={addToFriend}>
          {nicknameList.map(name => (
            <li key={name}>{name}</li>
          ))}
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
