import { Socket } from 'socket.io-client';
import { MyPlayer } from './Phaser/Player/myPlayer';
import { OtherPlayer } from './Phaser/Player/otherPlayer';
import { emitter } from './util';

import townJSON from '../../assets/tilemaps/town.json';
import town from '../../assets/tilemaps/town.png';
import christmas from '../../assets/audio/christmas.mp3';
import dust from '../../assets/character/dust.png';
import spriteJSON from '../../assets/character/sprite.json';

import waitImg from '../../assets/character/wait/wait.png';
import walkImg from '../../assets/character/walk/walk.png';
import runImg from '../../assets/character/run/run.png';
import rollImg from '../../assets/character/roll/roll.png';
import jumpImg from '../../assets/character/jump/jump.png';
import { stringObjectType } from '../../types/types';

const characterImg: stringObjectType = {
  wait: waitImg,
  walk: walkImg,
  run: runImg,
  roll: rollImg,
  jump: jumpImg,
};

export default class Game extends Phaser.Scene {
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  socket?: Socket;
  autoPlay: boolean;
  townLayer: any;

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
        400,
        400,
        data.id,
        data.hair,
        data.nickname,
        data.socket
      );

      // const debugGraphics = this.add.graphics().setAlpha(0.7);
      // this.townLayer.renderDebug(debugGraphics, {
      //   tileColor: null,
      //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      // });

      this.physics.add.collider(this.myPlayer, this.townLayer);

      this.socket?.on('connect', () => {
        this.socketInit();
      });
    });

    emitter.on('updateNickname', (nickname: string) => {
      this.myPlayer?.updateNickname(nickname);
    });

    emitter.on('updateHair', (hair: string) => {
      this.myPlayer?.updateHair(hair);
    });

    window.onclick = (e: MouseEvent) => {
      const elem = e.target as HTMLElement;
      const checkInput = elem.tagName === 'INPUT';

      this.input.keyboard.manager.enabled = !checkInput;
    };
  }

  preload() {
    // this.load.image('background', background);
    this.load.tilemapTiledJSON('map', townJSON);
    this.load.image('tileset', town);

    this.load.audio('christmas', [christmas]);

    // 캐릭터 동작
    const actions = ['wait', 'walk', 'run', 'roll', 'jump'];

    actions.forEach((action: string) => {
      this.load.atlas(action, characterImg[action], spriteJSON);
    });

    // 이펙트
    this.load.spritesheet('dust', dust, {
      frameWidth: 24,
      frameHeight: 9,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town', 'tileset');
    this.townLayer = map.createLayer('town', tileset, 0, 0).setScale(2.5);
    this.townLayer.setCollisionByProperty({ collides: true });

    this.physics.world.setBounds(
      0,
      0,
      this.townLayer.width * 2.5,
      this.townLayer.height * 2.5
    );

    this.sound.add('christmas');

    const spriteInfo = [
      { action: 'wait', start: 1, end: 9 },
      { action: 'walk', start: 1, end: 8 },
      { action: 'run', start: 1, end: 8 },
      { action: 'roll', start: 2, end: 5 },
      { action: 'jump', start: 1, end: 9 },
    ];

    const hairInfo = [
      'nohair',
      'longhair',
      'mophair',
      'shorthair',
      'spikeyhair',
      'bowlhair',
      'curlyhair',
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

        hairInfo.forEach((hair: string) => {
          this.anims.create({
            key: `${hair}-${action}`,
            frames: this.anims.generateFrameNames(action, {
              prefix: `${hair}`,
              start,
              end,
            }),
            frameRate: 10,
            repeat: -1,
          });
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

    this.socket.on('userInitiated', (data: any) => {
      if (!Array.isArray(data)) data = [data];

      data.forEach((user: any) => {
        const id = user.id.toString().trim();
        if (this.myPlayer?.id === id) return;
        if (this.otherPlayer[id]) return;

        this.otherPlayer[id] = new OtherPlayer(this, user);
      });
    });

    this.socket.on('userCreated', (user: any) => {
      const id = user.id.toString().trim();
      this.otherPlayer[id] = new OtherPlayer(this, user);
    });

    this.socket.on('move', (data: any) => {
      const id = data.id.toString().trim();

      if (!this.otherPlayer[id]) return;
      const { state, x, y, direction } = data;
      this.otherPlayer[id].update(state, x, y, direction);
    });

    this.socket.on('userLeaved', (data: any) => {
      const id = data.id.toString().trim();
      this.otherPlayer[id].delete();
      delete this.otherPlayer[id];
    });

    this.socket.on('userDataChanged', (data: any) => {
      const { id, nickname, characterName } = data;
      this.otherPlayer[id].updateNickname(nickname);
      this.otherPlayer[id].updateHair(characterName);
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
