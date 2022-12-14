import { Socket } from 'socket.io-client';
import { MyPlayer } from '../Phaser/Player/myPlayer';
import { OtherPlayer } from '../Phaser/Player/otherPlayer';
import { emitter } from '../util';

const backToTown = { x: 1000, y: 1580 };

export default class Zombie extends Phaser.Scene {
  socket?: Socket;
  autoPlay?: boolean;
  background?: Phaser.Tilemaps.TilemapLayer;
  otherLayer?: Phaser.Tilemaps.TilemapLayer;
  myPlayer?: MyPlayer;
  otherPlayer: { [key: string]: OtherPlayer };
  gameEntry?: any;
  isEnterGameZone?: any;

  constructor() {
    super('Zombie');

    this.otherPlayer = {};
  }

  init(data: any) {
    this.myPlayer = new MyPlayer(
      this,
      1000,
      1500,
      data.myPlayer.id,
      data.myPlayer.hairName,
      data.myPlayer.nickname,
      data.socket
    );

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
  }

  create() {
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    const map = this.make.tilemap({ key: 'zombie' });
    const tileset3 = map.addTilesetImage('tileset3', 'tileset3');

    map.createLayer('other2', tileset3, 0, 0).setScale(2.5);
    this.background = map
      .createLayer('background', tileset3, 0, 0)
      .setScale(2.5);
    this.otherLayer = map.createLayer('other', tileset3, 0, 0).setScale(2.5);

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
}
