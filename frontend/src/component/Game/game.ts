import { Player } from './Phaser/Player/player';

export default class Game extends Phaser.Scene {
  player?: Phaser.GameObjects.Sprite;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.player;
  }

  preload() {
    this.load.image('background', './src/assets/background.png');
    this.load.audio('christmas', ['./src/assets/audio/christmas.mp3']);

    this.load.spritesheet(
      'character-wait',
      './src/assets/character/waiting/base_waiting_strip9.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-wait',
      './src/assets/character/waiting/bowlhair_waiting_strip9.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'character-walk',
      './src/assets/character/walking/base_walk_strip8.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-walk',
      './src/assets/character/walking/bowlhair_walk_strip8.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'character-roll',
      './src/assets/character/roll/base_roll_strip10.png',
      { frameWidth: 96, frameHeight: 64 }
    );

    this.load.spritesheet(
      'hair-roll',
      './src/assets/character/roll/bowlhair_roll_strip10.png',
      { frameWidth: 96, frameHeight: 64 }
    );
  }

  create() {
    this.add.image(0, 0, 'background').setScale(3);

    const music = this.sound.add('christmas');
    music.play();

    this.anims.create({
      key: 'character-wait',
      frames: this.anims.generateFrameNumbers('character-wait', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-wait',
      frames: this.anims.generateFrameNumbers('hair-wait', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-walk',
      frames: this.anims.generateFrameNumbers('character-walk', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-walk',
      frames: this.anims.generateFrameNumbers('hair-walk', {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'character-roll',
      frames: this.anims.generateFrameNumbers('character-roll', {
        start: 2,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'hair-roll',
      frames: this.anims.generateFrameNumbers('hair-roll', {
        start: 2,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.player = new Player(this, 0, 0);
  }

  update() {
    this.player?.update();
  }
}
