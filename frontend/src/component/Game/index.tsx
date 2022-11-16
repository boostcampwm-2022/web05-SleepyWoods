import { useRef, useEffect, useState } from 'react';
import config from './gameConfig';

const Game = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new Phaser.Game({ ...config, parent: ref.current });
    }
  }, []);

  return <div ref={ref}></div>;
};
export default Game;
