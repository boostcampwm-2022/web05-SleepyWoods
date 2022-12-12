import { Socket } from 'socket.io-client';
import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';
import { emitter, hairInfo, spriteInfo } from '../util';
import { gameInitType, userType } from '../../../types/types';

export default class Town extends Phaser.Scene {
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  socket?: Socket;
  autoPlay: boolean;
  townLayer?: Phaser.Tilemaps.TilemapLayer;
  mazeEntry?: any;

  constructor() {
    super('Town');

    this.socket;
    this.myPlayer;
    this.otherPlayer = {};
    this.autoPlay = false;
  }

  init() {
    emitter.on('init', (data: gameInitType) => {
      this.socket = data.socket.connect();

      this.myPlayer = new MyPlayer(
        this,
        1000,
        800,
        data.id,
        data.hair,
        data.nickname,
        data.socket
      );

      if (this.townLayer)
        this.physics.add.collider(this.myPlayer, this.townLayer);

      this.socket?.on('connect', () => {
        this.socketInit();
      });

      this.mazeEntry = this.physics.add.staticGroup({
        key: 'mazeEntry',
        frameQuantity: 3,
      });

      this.mazeEntry.getChildren()[0].setPosition(540, 810);

      this.mazeEntry.refresh();

      this.physics.add.overlap(this.myPlayer, this.mazeEntry, this.changeScene);
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

      if (this.myPlayer) this.myPlayer.isCanMove = !checkInput;
      this.input.keyboard.manager.enabled = !checkInput;
    };

    emitter.emit('game-start');
  }

  changeScene = (player: any, item: any) => {
    this.scene.pause();
    this.scene.start('Maze', {
      socket: this.socket,
      myPlayer: this.myPlayer,
      autoPlay: this.autoPlay,
    });
  };

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'town' });
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
          key: `tool-${action}`,
          frames: this.anims.generateFrameNames(action, {
            prefix: 'tool',
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

    this.socket.on('userInitiated', (data: userType[]) => {
      if (!Array.isArray(data)) data = [data];

      data.forEach((user: userType) => {
        const id = user.id.toString().trim();
        if (this.myPlayer?.id === id) return;
        if (this.otherPlayer[id]) return;

        this.otherPlayer[id] = new OtherPlayer(this, user);
      });
    });

    this.socket.on('userCreated', (user: userType) => {
      const id = user.id.toString().trim();
      this.otherPlayer[id] = new OtherPlayer(this, user);
    });

    this.socket.on('move', (data: userType) => {
      const id = data.id.toString().trim();

      if (!this.otherPlayer[id]) return;
      const { state, x, y, direction } = data;
      this.otherPlayer[id].update(state, x, y, direction);
    });

    this.socket.on('userLeaved', (data: userType) => {
      const id = data.id.toString().trim();
      this.otherPlayer[id].delete();
      delete this.otherPlayer[id];
    });

    this.socket.on('userDataChanged', (data: userType) => {
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
