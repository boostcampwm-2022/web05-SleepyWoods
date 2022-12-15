import { Socket } from 'socket.io-client';
import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';
import { emitter } from '../util';
import {  userType } from '../../../types/types';

const backToTown = { x: 1600, y: 1900 };

export default class Running extends Phaser.Scene {
  socket?: Socket;
  autoPlay?: boolean;
  background?: Phaser.Tilemaps.TilemapLayer;
  otherLayer?: Phaser.Tilemaps.TilemapLayer;
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  gameEntry?: any;
  isEnterGameZone?: any;
  roomId:string | undefined;

  constructor() {
    super('Running');

    this.otherPlayer = {};
    
  }

  init(data: any) {
    this.roomId = data.roomId;
    this.myPlayer = new MyPlayer(
      this,
      1750,
      1900,
      data.myPlayer.id,
      data.myPlayer.hairName,
      data.myPlayer.nickname,
      data.socket
    );

    this.socket = data.socket
    console.log(data.socket)
    // this.socketInit()
    

    this.gameEntry = this.physics.add.staticGroup({
      key: 'portal',
      frameQuantity: 1,
    });

    this.gameEntry
      .getChildren()[0]
      .setPosition(backToTown.x, backToTown.y)
      .setDepth(3);

    this.gameEntry.refresh();

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

    this.input.keyboard.manager.enabled = false;
  }

  create() {
    this.socket?.emit('startGame', { gameRoomId:this.roomId, gameType:'Running'});

    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'running' });
    const tileset3 = map.addTilesetImage('tileset3', 'tileset3');

    map.createLayer('background', tileset3, 0, 0).setScale(2.5);
    map.createLayer('object', tileset3, 0, 0).setScale(2.5);
    this.otherLayer = map.createLayer('other', tileset3, 0, 0).setScale(2.5);

    this.otherLayer.setCollisionByProperty({ collides: true });

    if (this.myPlayer) {
      this.physics.add.collider(this.myPlayer, this.otherLayer);
    }

    this.physics.world.setBounds(
      0,
      0,
      this.otherLayer.width * 2.5,
      this.otherLayer.height * 2.5
    );
  }

  update() {
    this.myPlayer?.update();
  }

  changeScene = (gameName: string) => {
    emitter.emit('closeContent');

    this.scene.pause();
    this.scene.start(gameName, {
      socket: this.socket,
      myPlayer: this.myPlayer,
      autoPlay: this.autoPlay,
    });
  };

  socketInit() {
    console.log(this.socket)
    if (!this.socket) return;
    console.log('socket init!!!')

    const userInitiated = (data: userType[]) => {
      console.log(data)
      if (!Array.isArray(data)) data = [data];

      data.forEach((user: userType) => {
        const id = user.id.toString().trim();
        if (this.myPlayer?.id === id) return;
        if (this.otherPlayer[id]) return;

        this.otherPlayer[id] = new OtherPlayer(this, user);
      });
    };

    const userCreated = (user: any) => {
      const id = user.id.toString().trim();
      this.otherPlayer[id] = new OtherPlayer(this, user);
    };

    const move = (data: userType) => {
      const id = data.id.toString().trim();

      if (!this.otherPlayer[id]) return;
      const { state, x, y, direction } = data;
      this.otherPlayer[id].update(state, x, y, direction);
    };

    const userLeaved = (data: userType) => {
      const id = data.id.toString().trim();
      console.log(this.otherPlayer[id], id)  
      try{
          this.otherPlayer[id].delete();
          delete this.otherPlayer[id];
        }catch(e){
          console.log("이미 사라졌습니다.");
        }
    };

    const userDataChanged = (data: userType) => {
      const { id, nickname, characterName } = data;
      this.otherPlayer[id].updateNickname(nickname);
      this.otherPlayer[id].updateHair(characterName);
    };

    this.socket.on('userInitiated', userInitiated);
    this.socket.on('userCreated', userCreated);
    this.socket.on('move', move);
    this.socket.on('userLeaved', userLeaved);
    this.socket.on('userDataChanged', userDataChanged);
    
    // this.socket.emit('startGame', { gameRoomId:this.roomId, gameType:'Running'});
    
    // emitter.on('gameStart', (data: any) => {
      // console.log('소켓 지워줌~~??')
      // this.socket?.removeListener('userInitiated', userInitiated);
      // this.socket?.removeListener('userCreated', userCreated);
      // this.socket?.removeListener('move', move);
      // this.socket?.removeListener('userLeaved', userLeaved);
      // this.socket?.removeListener('userDataChanged', userDataChanged);

    //   this.changeScene(data.gameName);
    // });
  }
}
