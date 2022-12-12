import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './store/atom/user';
import { friendsProps, friendsState } from './store/atom/friends';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socketState } from './store/atom/socket';

type friendList = {
  userId: string;
  nickname: string;
  characterName: string;
};

// 새로고침 될 때마다 해줄 로직 작성
export const routerGuard = () => {
  const setFriends = useSetRecoilState(friendsState);
  const socket = useRecoilValue(socketState);

  const initialList: friendsProps = {};

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/friendship');

        if (!data.length) return;

        const friendList: friendList[] = data;

        friendList.forEach(
          ({ userId, nickname }: { userId: string; nickname: string }) => {
            initialList[userId] = {
              id: userId,
              status: 'off',
              nickname: nickname,
              isCalling: false,
            };
          }
        );
      } catch (e) {
        console.log(e);
      } finally {
        socket.on('userInitiated', allUser => {
          allUser.forEach((user: any) => {
            const { id, userState } = user;

            if (!initialList[id]) return;

            initialList[id].status = userState;
          });

          setFriends(initialList);
        });
      }
    })();
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
