import { MyPlayer } from './Phaser/Player/myPlayer';

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
    const actions = ['wait', 'walk', 'run', 'roll', 'jump'];

    actions.forEach((action: string) => {
      this.load.atlas(
        action,
        `./src/assets/character/${action}/${action}.png`,
        `./src/assets/character/sprite.json`
      );
    });

    // 이펙트
    this.load.spritesheet('dust', './src/assets/character/dust.png', {
      frameWidth: 24,
      frameHeight: 9,
    });
  }

  create() {
    this.add.image(0, 0, 'background').setScale(3);

    const music = this.sound.add('christmas');
    // music.play();

    const spriteInfo = [
      { action: 'wait', start: 1, end: 9 },
      { action: 'walk', start: 1, end: 8 },
      { action: 'run', start: 1, end: 8 },
      { action: 'roll', start: 2, end: 5 },
      { action: 'jump', start: 1, end: 9 },
    ];

    spriteInfo.forEach(
      (info: { action: string; start: number; end: number }) => {
        const { action, start, end } = info;

        this.anims.create({
          key: `character-${action}`,
          frames: this.anims.generateFrameNames(action, {
            prefix: 'base',
            start,
            end,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: `hair-${action}`,
          frames: this.anims.generateFrameNames(action, {
            prefix: `${hair}`,
            start,
            end,
          }),
          frameRate: 10,
          repeat: -1,
        });
      }
    );

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
