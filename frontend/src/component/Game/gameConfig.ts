import Phaser from 'phaser';
import Town from './Scene/town';
import Maze from './Scene/maze';
import Zombie from './Scene/zombie';
import OnBoard from './Scene/onboard';
import Sprint from './Scene/sprint';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  autoFocus: true,
  scene: [OnBoard, Town, Maze, Zombie, Sprint],
};

export default gameConfig;
