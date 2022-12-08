import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { socketState } from '../../store/atom/socket';
import { userState } from '../../store/atom/user';
import config from './gameConfig';
import { emitter } from './util';

const Game = () => {
  const ref = useRef<HTMLDivElement>(null);
  const socket = useRecoilValue(socketState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user.nickname) return;

    emitter.on('ready', () => {
      emitter.emit('init', { ...user, socket });
    });

    if (!ref.current) return;
    const game = new Phaser.Game({ ...config, parent: ref.current });

    return () => {
      emitter.removeAllListeners();
      socket.removeAllListeners();
      socket.disconnect();
      game.destroy(true);
    };
  }, [user]);

  return <div ref={ref}></div>;
};
export default Game;
