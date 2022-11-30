import { Socket } from 'socket.io-client';
import { MyPlayer } from './Phaser/Player/myPlayer';
import { OtherPlayer } from './Phaser/Player/otherPlayer';
import { emitter } from './util';

const hair = 'bowlhair';

export default class Game extends Phaser.Scene {
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  socket?: Socket;
  autoPlay: boolean;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.socket;
    this.myPlayer;
    this.otherPlayer = {};
    this.autoPlay = false;
  }

  init() {
    emitter.on('init', (data: any) => {
      this.socket = data.socket.connect();
      this.myPlayer = new MyPlayer(
        this,
        -25,
        400,
        data.characterName,
        data.nickname,
        data.socket
      );

      this.socket?.on('connect', () => {
        this.socketInit();
      });
    });
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
    this.sound.add('christmas');

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

    emitter.emit('ready');
  }

  update() {
    this.myPlayer?.update();

    this.musicControll();
  }

  socketInit() {
    if (!this.socket) return;

    this.socket.on('userCreated', (data: any) => {
      if (!Array.isArray(data)) data = [data];

      data.map((user: any) => {
        if (this.myPlayer?.nickname === user.nickname) return false;
        if (this.otherPlayer[user.nickname]) return false;

        this.otherPlayer[user.nickname] = new OtherPlayer(this, user);
      });
    });

    this.socket.on('move', (data: any) => {
      this.otherPlayer[data.nickname].update(data.state, data.x, data.y);
    });
  }

  musicControll() {
    const music = this.sound.get('christmas');
    if (this.autoPlay && !this.sound.get('christmas').isPlaying) music.play();

    emitter.on('musicControll', (state: boolean) => {
      const changeState = music.isPlaying === state ? false : true;

      if (!changeState) return;

      music.isPlaying ? music.stop() : music.play();
      this.autoPlay = !this.autoPlay;
    });
  }
}
