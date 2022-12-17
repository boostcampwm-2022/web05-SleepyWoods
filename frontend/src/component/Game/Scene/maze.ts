import { Socket } from 'socket.io-client';
import { userType } from '../../../types/types';
import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';
import { emitter } from '../util';

const backToTown = { x: 1000, y: 1580 };

export default class Maze extends Phaser.Scene {
  socket?: Socket;
  autoPlay?: boolean;
  background?: Phaser.Tilemaps.TilemapLayer;
  otherLayer?: Phaser.Tilemaps.TilemapLayer;
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  gameEntry?: any;
  flag?: any;
  exit?: any;
  isEnterGameZone?: any;
  roomId: string | undefined;
  gameName: string;
  gameTimerText: any;
  gameTimer: any;
  userTime: string;
  isFinish: boolean;

  constructor() {
    super('Maze');

    this.otherPlayer = {};
    this.gameName = 'Maze';
    this.userTime = '00:00';
    this.isFinish = false;
  }

  init(data: any) {
    this.isFinish = false;
    this.otherPlayer = {};
    this.gameName = 'Maze';
    this.userTime = '00:00';
    this.roomId = data.roomId;
    this.myPlayer?.delete();
    delete this.myPlayer;

    this.myPlayer = new MyPlayer(
      this,
      1000,
      1500,
      data.myPlayer.id,
      data.myPlayer.hairName,
      data.myPlayer.nickname,
      data.socket
    );
    this.myPlayer.fixState(true, 'swimming', 1);

    this.socket = data.socket;
    this.socketInit();

    this.gameEntry = this.physics.add.staticGroup({
      key: 'portal',
      frameQuantity: 1,
    });

    this.flag = this.physics.add.staticGroup({
      key: 'flag',
      frameQuantity: 1,
    });

    this.exit = this.physics.add.staticGroup({
      key: 'flag',
      frameQuantity: 1,
    });

    this.gameEntry
      .getChildren()[0]
      .setPosition(backToTown.x, backToTown.y)
      .setDepth(3);

    this.flag.getChildren()[0].setPosition(1000, 500).setDepth(3);
    this.exit.getChildren()[0].setPosition(1400, 550).setDepth(0);

    this.gameEntry.refresh();
    this.flag.refresh();
    this.exit.refresh();

    const keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

    this.physics.add.overlap(this.myPlayer, this.gameEntry, () => {
      const { x, y } = backToTown;
      const text: (
        | Phaser.GameObjects.Graphics
        | Phaser.GameObjects.Text
        | undefined
      )[] = [];

      if (!this.isEnterGameZone) {
        text.push(
          this.add
            .graphics()
            .fillStyle(0xffffff, 50)
            .fillRoundedRect(x - 140, y - 70, 265, 40, 20),
          this.add.text(x - 130, y - 60, 'push G key for back to Town!', {
            color: '#000',
            font: '700 18px Arial',
          })
        );

        this.isEnterGameZone = true;

        setTimeout(() => {
          text[0]?.destroy();
          text[1]?.destroy();
          this.isEnterGameZone = false;
        }, 500);
      }

      if (Phaser.Input.Keyboard.JustDown(keyG)) {
        this.changeScene('Town');
      }
    });

    this.physics.add.overlap(this.myPlayer, this.flag, () => {
      if (!this.isFinish) {
        this.isFinish = true;
        this.gameTimer.remove();

        this.socket?.emit('winnerEmitter', {
          gameRoomId: this.roomId,
          gameType: this.gameName,
          gameTime: this.userTime,
        });
      }
    });

    const exitOverlap = this.physics.add.overlap(
      this.myPlayer,
      this.exit,
      () => {
        this.myPlayer?.fixState(false, 'wait', 1);
        exitOverlap.destroy();
      }
    );

    emitter.on('exitGame', () => {
      this.changeScene('Town');
    });

    // 처음 시작시 움직임을 막음
    this.input.keyboard.enabled = false;
    this.input.keyboard.manager.enabled = false;
  }
  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'maze' });
    const tileset3 = map.addTilesetImage('tileset3', 'tileset3');

    map.createLayer('root', tileset3, 0, 0).setScale(2.5);
    this.background = map
      .createLayer('background', tileset3, 0, 0)
      .setScale(2.5);
    this.otherLayer = map.createLayer('other', tileset3, 0, 0).setScale(2.5);
    map.createLayer('goal', tileset3, 0, 0).setScale(2.5);

    this.background.setCollisionByProperty({ collides: true });
    this.otherLayer.setCollisionByProperty({ collides: true });

    if (this.myPlayer) {
      this.physics.add.collider(this.myPlayer, this.background);
      this.physics.add.collider(this.myPlayer, this.otherLayer);
    }

    this.physics.world.setBounds(
      0,
      0,
      this.otherLayer.width * 2.5,
      this.otherLayer.height * 2.5
    );

    // 타이머
    this.gameTimerText = this.add
      .text(0, 0, '00:00', {
        font: '50px Arial',
        color: '#fff',
        padding: {
          top: 10,
          left: 30,
        },
      })
      .setScrollFactor(0, 0);
  }

  update() {
    this.myPlayer?.update();
  }

  changeScene = (gameName: string) => {
    emitter.emit('closeContent');
    this.socket?.emit('leaveGame', { gameRoomId: this.roomId });
    emitter.emit('leaveGame');
    this.gameTimerText.destroy();

    this.scene.pause();
    this.scene.start(gameName, {
      socket: this.socket,
      myPlayer: this.myPlayer,
      autoPlay: this.autoPlay,
    });
  };

  socketInit() {
    if (!this.socket) return;

    const userInitiated = (data: userType[]) => {
      if (!Array.isArray(data)) data = [data];

      data.forEach((user: userType) => {
        const id = user.id.toString().trim();
        if (this.myPlayer?.id === id) return;
        if (this.otherPlayer[id]) return;
        this.otherPlayer[id] = new OtherPlayer(this, {
          ...user,
          x: 1000,
          y: 1500,
        });
        this.otherPlayer[id].update('swimming', 1000, 1500, 'right');
      });
    };

    const userCreated = (user: any) => {
      const id = user.id.toString().trim();
      if (this.myPlayer?.id === id) return;
      if (this.otherPlayer[id]) return;

      this.otherPlayer[id] = new OtherPlayer(this, {
        ...user,
        x: 1000,
        y: 1500,
      });
      this.otherPlayer[id].update('swimming', 1000, 1500, 'right');
    };

    const move = (data: userType) => {
      const id = data.id.toString().trim();

      if (!this.otherPlayer[id]) return;
      const { state, x, y, direction } = data;
      this.otherPlayer[id].update(state, x, y, direction);
    };

    const userLeaved = (data: userType) => {
      const id = data.id.toString().trim();
      try {
        this.otherPlayer[id].delete();
        delete this.otherPlayer[id];
      } catch (e) {
        console.log('이미 사라졌습니다.');
      }
    };

    const userDataChanged = (data: userType) => {
      const { id, nickname, characterName } = data;
      this.otherPlayer[id].updateNickname(nickname);
      this.otherPlayer[id].updateHair(characterName);
    };

    const gameAlert = (data: any) => {
      const { status } = data;
      if (status === 'START_GAME') {
        let cnt: any = 3;
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            const cntText = this.add.text(
              1000 - (cnt === 'Start' ? 60 : 20),
              1400 - (cnt === 'Start' ? 40 : 60),
              `${cnt}`,
              {
                color: '#fff',
                font: `700 ${cnt === 'Start' ? '72px' : '108px'} Arial`,
              }
            );

            if (cnt === 'Start') {
              // 움직일 수 있음
              this.input.keyboard.enabled = true;
              this.input.keyboard.manager.enabled = true;

              const date = new Date();
              const currentTime = date.getTime();

              this.gameTimer = this.time.addEvent({
                delay: 1000,
                callback: () => {
                  this.userTime = this.updateTimer(currentTime);
                  this.gameTimerText.setText(this.userTime);
                },
                loop: true,
              });
            }

            this.time.delayedCall(900, () => {
              cntText.destroy();
              cnt -= 1;
              if (!cnt) cnt = 'Start';
            });
          },
          repeat: 3,
        });
      }
    };

    const finishGame = () => {
      this.isFinish = true;
      this.gameTimer.remove();
    };

    this.socket.on('userInitiated', userInitiated);
    this.socket.on('userCreated', userCreated);
    this.socket.on('move', move);
    this.socket.on('userLeaved', userLeaved);
    this.socket.on('userDataChanged', userDataChanged);
    this.socket.on('gameAlert', gameAlert);
    this.socket.on('finishGame', finishGame);

    this.socket.emit('startGame', {
      gameRoomId: this.roomId,
      gameType: 'Maze',
    });

    const leaveGame = () => {
      if (!this.socket) return;

      this.socket.removeListener('userInitiated', userInitiated);
      this.socket.removeListener('userCreated', userCreated);
      this.socket.removeListener('move', move);
      this.socket.removeListener('userLeaved', userLeaved);
      this.socket.removeListener('userDataChanged', userDataChanged);
      this.socket.removeListener('gameAlert', gameAlert);

      emitter.removeListener('leaveGame', leaveGame);
    };

    emitter.on('leaveGame', leaveGame);
  }

  updateTimer(currentTime: number) {
    const date = new Date();
    const timeDiff = date.getTime() - currentTime;

    const m = Math.abs(Math.floor(Math.floor(timeDiff / 1000) / 60))
      .toString()
      .padStart(2, '0');
    const s = Math.abs(Math.floor(timeDiff / 1000) % 60)
      .toString()
      .padStart(2, '0');

    return `${m}:${s}`;
  }
}
