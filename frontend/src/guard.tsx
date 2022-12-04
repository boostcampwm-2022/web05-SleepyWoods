import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from './store/atom/user';
import { friendsProps, friendsState } from './store/atom/friends';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type friendList = {
  nickname: string;
  characterName: string;
};

// 새로고침 될 때마다 해줄 로직 작성
export const routerGuard = () => {
  const setFriends = useSetRecoilState(friendsState);

  useEffect(() => {
    async () => {
      try {
        const { data } = await axios.get('/api/friendship');

        if (!data.length) return;

        const friendList: friendList[] = data;
        const initialList: friendsProps = {};

        friendList.forEach(({ nickname }: { nickname: string }) => {
          initialList[nickname] = {
            isOnline: false,
            name: nickname,
            isCalling: false,
          };
        });

        setFriends(initialList);
      } catch (e) {
        console.log(e);
      }
    };
  }, []);
};

// 페이지 이동할 때마다 해줄 로직 작성
export const pageGuard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log('page guard');
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/user/auth');

        setUser({
          id: data.id.toString().trim(),
          nickname: data.nickname.trim(),
          hair: data.characterName.trim(),
        });
      } catch (e) {
        navigate('/');
      }
    };

    user.nickname || getUser();
  }, []);
};
