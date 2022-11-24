import { MyPlayer } from './Phaser/Player/myplayer';
import { Player } from './Phaser/Player/player';

const hair = 'bowlhair';

export default class Game extends Phaser.Scene {
  player?: Phaser.GameObjects.Sprite;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.player;
  }

  preload() {
    this.load.image('background', './src/assets/background.png');
    this.load.audio('christmas', ['./src/assets/audio/christmas.mp3']);

    // 캐릭터 동작
    this.load.atlas(
      'wait',
      './src/assets/character/waiting/wait.png',
      './src/assets/character/sprite.json'
    );

    this.load.atlas(
      'walk',
      './src/assets/character/walking/walk.png',
      './src/assets/character/sprite.json'
    );

    this.load.atlas(
      'run',
      './src/assets/character/run/run.png',
      './src/assets/character/sprite.json'
    );

    this.load.atlas(
      'roll',
      './src/assets/character/roll/roll.png',
      './src/assets/character/sprite.json'
    );

    // 이펙트
    this.load.spritesheet('dust', './src/assets/character/dust.png', {
      frameWidth: 24,
      frameHeight: 9,
    });
  }

  create() {
    this.add.image(0, 0, 'background').setScale(3);

    const music = this.sound.add('christmas');
    music.play();

    this.anims.create({
      key: 'character-wait',
      frames: this.anims.generateFrameNames('wait', {
        prefix: 'base',
        start: 1,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-wait',
      frames: this.anims.generateFrameNames('wait', {
        prefix: `${hair}`,
        start: 1,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-walk',
      frames: this.anims.generateFrameNames('walk', {
        prefix: 'base',
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-walk',
      frames: this.anims.generateFrameNames('walk', {
        prefix: `${hair}`,
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-run',
      frames: this.anims.generateFrameNames('run', {
        prefix: 'base',
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-run',
      frames: this.anims.generateFrameNames('run', {
        prefix: `${hair}`,
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-roll',
      frames: this.anims.generateFrameNames('roll', {
        prefix: 'base',
        start: 2,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-roll',
      frames: this.anims.generateFrameNames('roll', {
        prefix: `${hair}`,
        start: 2,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'dust',
      frames: this.anims.generateFrameNames('dust', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.player = new MyPlayer(this, -25, 400);
  }

  update() {
    this.player?.update();
  }
}
